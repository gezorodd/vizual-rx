import {
  delayWhen,
  map,
  mergeWith,
  Observable,
  of,
  race,
  Subject,
  switchMap,
  takeUntil,
  tap,
  timer,
  TimestampProvider,
  VirtualAction,
  VirtualTimeScheduler
} from "rxjs";
import {VizualRxAbstractEngine} from "./vizual-rx-abstract-engine";
import {
  VizualRxEngineErrorNotification,
  VizualRxEngineNextNotification,
  VizualRxEngineNotification,
  VizualRxEngineObserver
} from "./vizual-rx-engine";
import {VizualRxScaledTimeScheduler} from "./vizual-rx-scaled-time-scheduler";
import {VizualRxObserver} from "./vizual-rx-observer";

export class VizualRxVirtualTimeEngine extends VizualRxAbstractEngine<VirtualTimeScheduler, VizualRxScaledTimeScheduler> {

  private finish$ = new Subject<void>();

  constructor() {
    super();
    this.stopEngineAfterSchedulerFrames()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.stop());
  }

  protected override run() {
    this.executionScheduler.frame = 0;
    super.run();
    this.executionScheduler.flush();
    this.time.reset();
  }

  override get animation$(): Observable<number> {
    return super.animation$
      .pipe(
        mergeWith(
          this.finish$
            .pipe(
              map(() => this.executionScheduler.frame)
            )
        ),
        map(time => {
          if (Number.isFinite(time)) {
            return time;
          } else {
            return this.executionScheduler.frame;
          }
        })
      );
  }

  override get maxTimeFactor(): number {
    return 5;
  }

  override get enableInfiniteTimeFactor(): boolean {
    return true;
  }

  protected override createExecutionScheduler(): VirtualTimeScheduler {
    return new VirtualTimeScheduler(VirtualAction, 30000);
  }

  protected override createAnimationScheduler(): VizualRxScaledTimeScheduler {
    return new VizualRxScaledTimeScheduler(this.time);
  }

  protected override createVizualRxEngineObserver(observer: VizualRxObserver): VizualRxEngineObserver {
    return new VizualRxVirtualTimeEngineObserver(this.executionScheduler, this.animationScheduler, this.finish$, observer);
  }

  private stopEngineAfterSchedulerFrames(): Observable<unknown> {
    return this.starting$
      .pipe(
        switchMap(() => timer(this.executionScheduler.frame, this.animationScheduler)),
        tap(() => {
          this.finish$.next();
          this.stop();
        })
      );
  }
}


class VizualRxVirtualTimeEngineObserver implements VizualRxEngineObserver {
  readonly id: string;
  readonly label: string;

  constructor(private executionTimeProvider: TimestampProvider, private animationScheduler: VizualRxScaledTimeScheduler,
              private finish$: Observable<void>, private observer: VizualRxObserver) {
    this.id = observer.id;
    this.label = observer.label;
  }

  get next$(): Observable<VizualRxEngineNextNotification> {
    return this.observer.next$
      .pipe(
        map(value => ({
          time: this.executionTimeProvider.now(),
          value
        })),
        delayWhen(value => {
          if (Number.isFinite(this.animationScheduler.scaledTime.timeFactor)) {
            return race(this.finish$, timer(value.time, this.animationScheduler));
          } else {
            return of(1);
          }
        })
      );
  }

  get error$(): Observable<VizualRxEngineErrorNotification> {
    return this.observer.error$
      .pipe(
        map(err => ({
          time: this.executionTimeProvider.now(),
          err
        })),
        delayWhen(value => {
          if (Number.isFinite(this.animationScheduler.scaledTime.timeFactor)) {
            return race(this.finish$, timer(value.time, this.animationScheduler))
          } else {
            return of(1);
          }
        })
      );
  }

  get complete$(): Observable<VizualRxEngineNotification> {
    return this.observer.complete$
      .pipe(
        map(() => ({
          time: this.executionTimeProvider.now()
        })),
        delayWhen(value => {
          if (Number.isFinite(this.animationScheduler.scaledTime.timeFactor)) {
            return race(this.finish$, timer(value.time, this.animationScheduler));
          } else {
            return of(1);
          }
        })
      );
  }
}
