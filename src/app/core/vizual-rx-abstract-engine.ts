import {InterpreterError, VizualRxInterpreter} from "./vizual-rx-interpreter";
import {
  animationFrames,
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  merge,
  mergeMap,
  Observable,
  pairwise,
  SchedulerLike,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
  tap,
  TimestampProvider,
  windowToggle,
} from "rxjs";
import {VizualRxScaledTime} from "./vizual-rx-scaled-time";
import {VizualRxObserver} from "./vizual-rx-observer";
import {VizualRxEngine, VizualRxRemoteObserver} from "./vizual-rx-engine";

export abstract class VizualRxAbstractEngine<
  EXECUTION_SCH extends SchedulerLike & TimestampProvider,
  ANIMATION_SCH extends SchedulerLike & TimestampProvider> implements VizualRxEngine {

  code: string;
  error: InterpreterError | undefined;

  readonly executionScheduler: EXECUTION_SCH;
  readonly animationScheduler: ANIMATION_SCH;

  readonly starting$: Observable<void>;
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
    this.animationScheduler = this.createAnimationScheduler();

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

  abstract get maxTimeFactor(): number;

  abstract get enableInfiniteTimeFactor(): boolean;

  protected abstract createExecutionScheduler(): EXECUTION_SCH;

  protected abstract createAnimationScheduler(): ANIMATION_SCH;

  protected abstract createVizualRxEngineObserver(observer: VizualRxObserver): VizualRxRemoteObserver;

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

  get animation$(): Observable<number> {
    return this.starting$
      .pipe(
        switchMap(() =>
          animationFrames(this.animationScheduler)
            .pipe(
              takeUntil(this.stopping$)
            )
        ),
        windowToggle(
          this.playing$,
          () => this.playing$
            .pipe(
              filter(playing => !playing)
            )
        ),
        mergeMap(win$ => win$),
        map(frame => frame.elapsed)
      )
  }

  get observers$(): Observable<VizualRxRemoteObserver[]> {
    return this._observers$
      .pipe(
        map(observers =>
          observers.map(observer => this.createVizualRxEngineObserver(observer))
        )
      );
  }

  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
        map(() => undefined)
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
