import {InterpreterError, VizualRxInterpreter} from "./vizual-rx-interpreter";
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  pairwise,
  SchedulerLike,
  Subject,
  Subscription,
  takeUntil,
  TimestampProvider,
} from "rxjs";
import {VizualRxScaledTime} from "./vizual-rx-scaled-time";
import {VizualRxObserver} from "./vizual-rx-observer";
import {VizualRxEngine, VizualRxRemoteObserver} from "./vizual-rx-engine";

export abstract class VizualRxAbstractEngine<T extends SchedulerLike & TimestampProvider> implements VizualRxEngine {
  code: string;
  error: InterpreterError | undefined;

  readonly executionScheduler: T;

  readonly starting$: Observable<number>;
  readonly stopping$: Observable<void>;
  readonly stopped$: Observable<boolean>;
  readonly playing$: Observable<boolean>;

  protected subscriptions: Subscription[];
  protected readonly time: VizualRxScaledTime;
  protected readonly interpreter: VizualRxInterpreter;
  protected readonly destroy$ = new Subject<void>();

  private readonly state$: BehaviorSubject<PlayerState>;
  private readonly timeFactor$: BehaviorSubject<number>;
  private readonly _observers$ = new BehaviorSubject<VizualRxObserver[]>([]);

  protected constructor() {
    this.code = '';
    this.state$ = new BehaviorSubject<PlayerState>(PlayerState.STOPPED);
    this.timeFactor$ = new BehaviorSubject<number>(1);
    this.subscriptions = [];

    this.stopped$ = this.getStopped();
    this.playing$ = this.getPlaying();
    this.starting$ = this.getStarting();
    this.stopping$ = this.getStopping();

    this.time = new VizualRxScaledTime();
    this.executionScheduler = this.createExecutionScheduler();
    this.interpreter = new VizualRxInterpreter(this.executionScheduler);
    this.interpreter.subscriptionCreated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(subscription => this.subscriptions.push(subscription));
    this.interpreter.observerAdded$
      .pipe(takeUntil(this.destroy$))
      .subscribe(observer => {
        this._observers$.next([...this._observers$.value, observer]);
      });
  }

  abstract now(): number;

  abstract get observers$(): Observable<VizualRxRemoteObserver[]>;

  abstract get maxTimeFactor(): number;

  abstract get enableInfiniteTimeFactor(): boolean;

  protected abstract createExecutionScheduler(): T;

  protected abstract get startingTime(): number;

  get playing(): boolean {
    return this.state$.value === PlayerState.PLAYING;
  }

  prepare(code: string): void {
    this.code = code;
    this.interpreter.compile(code);
  }

  play(): void {
    const state = this.state$.value;
    if (state === PlayerState.PLAYING) {
      return;
    }

    this.time.timeFactor = this.timeFactor$.value;
    if (state === PlayerState.STOPPED) {
      this._observers$.next([]);
      this.subscriptions = [];
      this.run();
    }
    this._observers$.value.forEach(observer => observer.paused = false);
    this.state$.next(PlayerState.PLAYING);
  }

  pause(): void {
    if (this.state$.value !== PlayerState.PLAYING) {
      return;
    }
    this.time.timeFactor = 0;
    this._observers$.value.forEach(observer => observer.paused = true);
    this.state$.next(PlayerState.PAUSED);
  }

  stop(): void {
    if (this.state$.value === PlayerState.STOPPED) {
      return;
    }
    this.subscriptions
      .filter(subscription => !subscription.closed)
      .forEach(subscription => subscription.unsubscribe());
    this.time.timeFactor = 0;
    this.state$.next(PlayerState.STOPPED);
  }

  replay(): void {
    this.stop();
    this.play();
  }

  get timeFactor(): number {
    return this.timeFactor$.value;
  }

  set timeFactor(factor: number) {
    if (!Number.isFinite(factor)) {
      if (!this.enableInfiniteTimeFactor) {
        factor = this.maxTimeFactor;
      }
    } else if (factor > this.maxTimeFactor) {
      factor = this.maxTimeFactor;
    }
    this.timeFactor$.next(factor);
    if (this.playing) {
      this.time.timeFactor = factor;
    }
  }

  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected get internalObservers$(): Observable<VizualRxObserver[]> {
    return this._observers$.asObservable();
  }

  protected run(): void {
    this.error = undefined;
    try {
      this.interpreter.run(this.code);
    } catch (e) {
      if (e instanceof InterpreterError) {
        this.error = e;
      }
      throw e;
    }
  }

  private getStopped() {
    return this.state$
      .pipe(
        map(state => state === PlayerState.STOPPED)
      );
  }

  private getStarting() {
    return this.state$
      .pipe(
        pairwise(),
        filter(states => states[0] === PlayerState.STOPPED && states[1] === PlayerState.PLAYING),
        map(() => this.startingTime)
      );
  }

  private getStopping() {
    return this.state$
      .pipe(
        pairwise(),
        filter(states => {
          const wasPlayingOrPaused = states[0] === PlayerState.PLAYING || states[0] === PlayerState.PAUSED;
          const isStopped = states[1] === PlayerState.STOPPED;
          return wasPlayingOrPaused && isStopped;
        }),
        map(() => undefined)
      );
  }

  private getPlaying() {
    return this.state$
      .pipe(
        map(state => state === PlayerState.PLAYING)
      );
  }
}

export enum PlayerState {
  STOPPED,
  PAUSED,
  PLAYING
}
