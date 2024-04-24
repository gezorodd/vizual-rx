import {VizualRxAbstractEngine} from "./vizual-rx-abstract-engine";
import {animationFrames, filter, map, Observable, takeUntil, tap, TimestampProvider, withLatestFrom} from "rxjs";
import {VizualRxScaledTimeScheduler} from "./vizual-rx-scaled-time-scheduler";
import {
  VizualRxRemoteErrorNotification,
  VizualRxRemoteNextNotification,
  VizualRxRemoteNotification,
  VizualRxRemoteObserver
} from "./vizual-rx-engine";
import {VizualRxObserver} from "./vizual-rx-observer";

export class VizualRxScaledTimeEngine extends VizualRxAbstractEngine<VizualRxScaledTimeScheduler, VizualRxScaledTimeScheduler> {

  constructor() {
    super();
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

  protected override createVizualRxEngineObserver(observer: VizualRxObserver): VizualRxRemoteObserver {
    return new VizualRxAsyncEngineObserver(this.executionScheduler, observer);
  }

  private stopEngineWhenAllSubscriptionsAreClosed() {
    return this.animation$
      .pipe(
        filter(() => this.subscriptions.every(subscription => subscription.closed)),
        tap(() => this.stop())
      );
  }
}


class VizualRxAsyncEngineObserver implements VizualRxRemoteObserver {
  readonly id: string;
  readonly label: string;

  constructor(private timestampProvider: TimestampProvider, private observer: VizualRxObserver) {
    this.id = observer.id;
    this.label = observer.label;
  }

  get next$(): Observable<VizualRxRemoteNextNotification> {
    return this.observer.next$
      .pipe(
        withLatestFrom(animationFrames(this.timestampProvider)),
        map(([value, frame]) => ({
          time: frame.elapsed,
          value
        }))
      );
  }

  get error$(): Observable<VizualRxRemoteErrorNotification> {
    return this.observer.error$
      .pipe(
        withLatestFrom(animationFrames(this.timestampProvider)),
        map(([err, frame]) => ({
          time: frame.elapsed,
          err
        }))
      );
  }

  get complete$(): Observable<VizualRxRemoteNotification> {
    return this.observer.complete$
      .pipe(
        withLatestFrom(animationFrames(this.timestampProvider)),
        map(([_, frame]) => ({
          time: frame.elapsed
        }))
      );
  }
}
