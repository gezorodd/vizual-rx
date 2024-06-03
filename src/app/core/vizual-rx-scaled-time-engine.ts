import {VizualRxAbstractEngine} from "./vizual-rx-abstract-engine";
import {animationFrames, filter, finalize, map, Observable, switchMap, takeUntil, tap} from "rxjs";
import {VizualRxScaledTimeScheduler} from "./vizual-rx-scaled-time-scheduler";
import {
  VizualRxEngineErrorNotification,
  VizualRxEngineNextNotification,
  VizualRxEngineNotification,
  VizualRxEngineObserver
} from "./vizual-rx-engine";
import {VizualRxObserver} from "./vizual-rx-observer";

export class VizualRxScaledTimeEngine extends VizualRxAbstractEngine<VizualRxScaledTimeScheduler, VizualRxScaledTimeScheduler> {

  private frameTime: number;

  constructor() {
    super();
    this.frameTime = 0;

    this.starting$
      .pipe(
        tap(() => this.frameTime = 0),
        switchMap(() =>
          animationFrames(this.executionScheduler)
            .pipe(
              finalize(() => this.frameTime = 0),
              takeUntil(this.stopping$)
            )
        ),
        map(frame => frame.elapsed)
      )
      .subscribe(time => this.frameTime = time);

    this.stopEngineWhenAllSubscriptionsAreClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  override get maxTimeFactor(): number {
    return 2;
  }

  override get enableInfiniteTimeFactor(): boolean {
    return false;
  }

  protected override createExecutionScheduler(): VizualRxScaledTimeScheduler {
    return new VizualRxScaledTimeScheduler(this.time);
  }

  protected override createAnimationScheduler(): VizualRxScaledTimeScheduler {
    return this.executionScheduler;
  }

  protected override createVizualRxEngineObserver(observer: VizualRxObserver): VizualRxEngineObserver {
    return new VizualRxAsyncEngineObserver(() => this.frameTime, observer);
  }

  private stopEngineWhenAllSubscriptionsAreClosed() {
    return this.animation$
      .pipe(
        filter(() => this.subscriptions.every(subscription => subscription.closed)),
        tap(() => this.stop())
      );
  }
}


class VizualRxAsyncEngineObserver implements VizualRxEngineObserver {
  readonly id: string;
  readonly label: string;

  constructor(private frameTimeProvider: () => number, private observer: VizualRxObserver) {
    this.id = observer.id;
    this.label = observer.label;
  }

  get next$(): Observable<VizualRxEngineNextNotification> {
    return this.observer.next$
      .pipe(
        map(value => ({
          time: this.frameTimeProvider(),
          value
        }))
      );
  }

  get error$(): Observable<VizualRxEngineErrorNotification> {
    return this.observer.error$
      .pipe(
        map(err => ({
          time: this.frameTimeProvider(),
          err
        }))
      );
  }

  get complete$(): Observable<VizualRxEngineNotification> {
    return this.observer.complete$
      .pipe(
        map(() => ({
            time: this.frameTimeProvider(),
        }))
      );
  }
}
