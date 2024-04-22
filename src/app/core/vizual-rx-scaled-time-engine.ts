import {VizualRxAbstractEngine} from "./vizual-rx-abstract-engine";
import {filter, interval, map, mergeMap, Observable, takeUntil, tap, TimestampProvider} from "rxjs";
import {VizualRxScaledTimeScheduler} from "./vizual-rx-scaled-time-scheduler";
import {
  VizualRxRemoteErrorNotification,
  VizualRxRemoteNextNotification,
  VizualRxRemoteNotification,
  VizualRxRemoteObserver
} from "./vizual-rx-engine";
import {VizualRxObserver} from "./vizual-rx-observer";

export class VizualRxScaledTimeEngine extends VizualRxAbstractEngine<VizualRxScaledTimeScheduler> {

  constructor() {
    super();
    this.stopEngineWhenAllSubscriptionsAreClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  override now(): number {
    return this.executionScheduler.now();
  }

  override get observers$(): Observable<VizualRxRemoteObserver[]> {
    return this.internalObservers$
      .pipe(
        map(observers =>
          observers.map(observer => new VizualRxAsyncEngineObserver(this.executionScheduler, observer))
        )
      );
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

  protected override get startingTime(): number {
    return this.now();
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
        map(value => ({
          time: this.timestampProvider.now(),
          value
        }))
      );
  }

  get error$(): Observable<VizualRxRemoteErrorNotification> {
    return this.observer.error$
      .pipe(
        map(err => ({
          time: this.timestampProvider.now(),
          err
        }))
      );
  }

  get complete$(): Observable<VizualRxRemoteNotification> {
    return this.observer.complete$
      .pipe(
        map(() => ({
          time: this.timestampProvider.now()
        }))
      );
  }
}
