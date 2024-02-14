import {VizualRxInterpreter} from "./vizual-rx-interpreter";
import {
  BehaviorSubject,
  catchError,
  delay,
  filter,
  forkJoin,
  map,
  mergeMap,
  Observable,
  of,
  pairwise,
  takeUntil,
  tap
} from "rxjs";
import {VizualRxObservable} from "./vizual-rx-observable";
import {VizualRxTimeFactoryHistory} from "./vizual-rx-time-factory-history";
import {VizualRxTime} from "./vizual-rx-time";

export class VizualRxEngine {
  code: string;
  observables: VizualRxObservable[];
  timeFactorHistory: VizualRxTimeFactoryHistory[];

  private readonly interpreter: VizualRxInterpreter;
  private readonly state$: BehaviorSubject<PlayerState>;
  private readonly timeFactor$: BehaviorSubject<number>;

  readonly stopping$: Observable<void>;
  readonly starting$: Observable<void>;
  readonly stopped$: Observable<boolean>;
  readonly playing$: Observable<boolean>;

  constructor(code: string) {
    this.interpreter = new VizualRxInterpreter();
    this.code = code;
    this.observables = [];
    this.state$ = new BehaviorSubject<PlayerState>(PlayerState.STOPPED);
    this.timeFactor$ = new BehaviorSubject<number>(1);

    this.stopped$ = this.getStopped();
    this.playing$ = this.getPlaying();
    this.stopping$ = this.getStopping();
    this.starting$ = this.getStarting();
    this.timeFactorHistory = [];

    this.stopEngineWhenAllObservablesAreCompletedOrErrored()
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
      this.observables = this.interpreter.createObservables(this.code);
      this.timeFactorHistory = [];
    }
    this.state$.next(PlayerState.PLAYING);
    this.addTimeFactorHistory();
  }

  pause(): void {
    if (this.state$.value !== PlayerState.PLAYING) {
      return;
    }
    VizualRxTime.timeFactor = 0;
    this.state$.next(PlayerState.PAUSED);
    this.addTimeFactorHistory();
  }

  stop(): void {
    if (this.state$.value === PlayerState.STOPPED) {
      return;
    }
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
    this.addTimeFactorHistory();
  }

  private stopEngineWhenAllObservablesAreCompletedOrErrored() {
    return this.starting$
      .pipe(
        mergeMap(() => {
          const completedObservables = this.observables
            .map(obs => {
              return obs.completed$
                .pipe(
                  catchError(() => of(undefined)),
                  takeUntil(this.stopping$)
                );
            });

          return forkJoin(completedObservables)
            .pipe(
              delay(200),
              tap(() => this.stop())
            );
        })
      );
  }

  private addTimeFactorHistory() {
    if (this.timeFactorHistory.length > 0) {
      const lastHistory = this.timeFactorHistory[this.timeFactorHistory.length - 1];
      if (lastHistory.timeFactor === VizualRxTime.timeFactor) {
        return;
      }
    }
    this.timeFactorHistory.push(new VizualRxTimeFactoryHistory());
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
