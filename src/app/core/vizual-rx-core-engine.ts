import {InterpreterError, VizualRxInterpreter} from "./vizual-rx-interpreter";
import {
  BehaviorSubject,
  filter,
  interval,
  map,
  mergeMap,
  Observable,
  pairwise,
  Subject,
  Subscription,
  takeUntil,
  tap,
} from "rxjs";
import {VizualRxTime} from "./vizual-rx-time";
import {VizualRxCoreObserver} from "./vizual-rx-core-observer";
import {VizualRxScheduler} from "./vizual-rx-scheduler";

export class VizualRxCoreEngine {
  code: string;
  subscriptions: Subscription[];
  error?: InterpreterError;

  readonly scheduler: VizualRxScheduler;
  readonly stopping$: Observable<void>;
  readonly starting$: Observable<void>;
  readonly stopped$: Observable<boolean>;
  readonly playing$: Observable<boolean>;

  private readonly time: VizualRxTime;
  private readonly interpreter: VizualRxInterpreter;
  private readonly state$: BehaviorSubject<PlayerState>;
  private readonly timeFactor$: BehaviorSubject<number>;
  private readonly destroy$ = new Subject<void>();
  private readonly _observers$ = new BehaviorSubject<VizualRxCoreObserver[]>([]);

  constructor(code = '') {
    this.code = code;
    this.subscriptions = [];
    this.state$ = new BehaviorSubject<PlayerState>(PlayerState.STOPPED);
    this.timeFactor$ = new BehaviorSubject<number>(1);

    this.stopped$ = this.getStopped();
    this.playing$ = this.getPlaying();
    this.stopping$ = this.getStopping();
    this.starting$ = this.getStarting();

    this.time = new VizualRxTime();
    this.scheduler = new VizualRxScheduler(this.time);
    this.interpreter = new VizualRxInterpreter(this.scheduler);
    this.interpreter.observerAdded$
      .pipe(takeUntil(this.destroy$))
      .subscribe(observer => {
        this._observers$.next([...this._observers$.value, observer]);
      });
    this.interpreter.subscriptionCreated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(subscription => this.subscriptions.push(subscription));

    this.stopEngineWhenAllSubscriptionsAreClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

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
      this.runCode();
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
    this.timeFactor$.next(factor);
    if (this.playing) {
      this.time.timeFactor = factor;
    }
  }

  get observers$(): Observable<VizualRxCoreObserver[]> {
    return this._observers$.asObservable();
  }

  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private runCode(): void {
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

  private stopEngineWhenAllSubscriptionsAreClosed() {
    return this.starting$
      .pipe(
        mergeMap(() => {
          return interval(15)
            .pipe(
              filter(() => this.subscriptions.every(subscription => subscription.closed)),
              tap(() => this.stop()),
              takeUntil(this.stopping$)
            );
        })
      );
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
