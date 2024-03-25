import {VizualRxInterpreter} from "./vizual-rx-interpreter";
import {
  BehaviorSubject,
  filter,
  interval,
  map,
  mergeMap,
  Observable,
  pairwise,
  Subscription,
  takeUntil,
  tap,
} from "rxjs";
import {VizualRxTime} from "./vizual-rx-time";
import {VizualRxObserver} from "./vizual-rx-observer";

export class VizualRxEngine {
  code: string;
  observers: VizualRxObserver[];
  subscriptions: Subscription[];
  error?: Error;

  private readonly interpreter: VizualRxInterpreter;
  private readonly state$: BehaviorSubject<PlayerState>;
  private readonly timeFactor$: BehaviorSubject<number>;

  readonly stopping$: Observable<void>;
  readonly starting$: Observable<void>;
  readonly stopped$: Observable<boolean>;
  readonly playing$: Observable<boolean>;

  constructor() {
    this.code = '';
    this.observers = [];
    this.subscriptions = [];
    this.state$ = new BehaviorSubject<PlayerState>(PlayerState.STOPPED);
    this.timeFactor$ = new BehaviorSubject<number>(1);

    this.stopped$ = this.getStopped();
    this.playing$ = this.getPlaying();
    this.stopping$ = this.getStopping();
    this.starting$ = this.getStarting();

    this.interpreter = new VizualRxInterpreter();
    this.interpreter.observerAdded$
      .subscribe(observer => this.observers.push(observer));
    this.interpreter.subscriptionCreated$
      .subscribe(subscription => this.subscriptions.push(subscription));

    this.stopEngineWhenAllSubscriptionsAreClosed()
      .subscribe();
  }

  get playing(): boolean {
    return this.state$.value === PlayerState.PLAYING;
  }

  play(): void {
    const state = this.state$.value;
    if (state === PlayerState.PLAYING) {
      return;
    }

    VizualRxTime.timeFactor = this.timeFactor$.value;
    if (state === PlayerState.STOPPED) {
      this.observers = [];
      this.subscriptions = [];
      this.runCode();
    }
    this.observers.forEach(observer => observer.paused = false);
    this.state$.next(PlayerState.PLAYING);
  }

  pause(): void {
    if (this.state$.value !== PlayerState.PLAYING) {
      return;
    }
    VizualRxTime.timeFactor = 0;
    this.observers.forEach(observer => observer.paused = true);
    this.state$.next(PlayerState.PAUSED);
  }

  stop(): void {
    if (this.state$.value === PlayerState.STOPPED) {
      return;
    }
    this.subscriptions
      .filter(subscription => !subscription.closed)
      .forEach(subscription => subscription.unsubscribe());
    VizualRxTime.timeFactor = 0;
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
      VizualRxTime.timeFactor = factor;
    }
  }

  private runCode(): void {
    this.error = undefined;
    try {
      this.interpreter.runCode(this.code);
    } catch (e) {
      if (e instanceof Error) {
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
