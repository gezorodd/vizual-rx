import {
  delayWhen,
  map,
  mergeMap,
  Observable,
  of,
  takeUntil,
  tap,
  timer,
  TimestampProvider,
  VirtualAction,
  VirtualTimeScheduler
} from "rxjs";
import {VizualRxAbstractEngine} from "./vizual-rx-abstract-engine";
import {
  VizualRxRemoteErrorNotification,
  VizualRxRemoteNextNotification,
  VizualRxRemoteNotification,
  VizualRxRemoteObserver
} from "./vizual-rx-engine";
import {VizualRxScaledTimeScheduler} from "./vizual-rx-scaled-time-scheduler";
import {VizualRxObserver} from "./vizual-rx-observer";

export class VizualRxVirtualTimeEngine extends VizualRxAbstractEngine<VirtualTimeScheduler> {

  private readonly playingScheduler: VizualRxScaledTimeScheduler;
  private startPlayingTime = 0;

  constructor() {
    super();
    this.playingScheduler = new VizualRxScaledTimeScheduler(this.time);

    this.stopEngineAfterSchedulerFrames()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.stop());
  }

  override now(): number {
    if (!Number.isFinite(this.timeFactor)) {
      return this.executionScheduler.frame;
    }
    return Math.min(this.playingScheduler.now() - this.startPlayingTime, this.executionScheduler.frame);
  }

  override get observers$(): Observable<VizualRxRemoteObserver[]> {
    return this.internalObservers$
      .pipe(
        map(observers =>
          observers.map(observer => new VizualRxVirtualTimeEngineObserver(this.executionScheduler,
            this.playingScheduler, observer))
        )
      );
  }

  override get maxTimeFactor(): number {
    return 5;
  }

  override get enableInfiniteTimeFactor(): boolean {
    return true;
  }

  protected override run() {
    this.executionScheduler.frame = 0;
    super.run();
    this.executionScheduler.flush();
    this.time.reset();
    this.startPlayingTime = this.playingScheduler.now();
  }

  protected override createExecutionScheduler(): VirtualTimeScheduler {
    return new VirtualTimeScheduler(VirtualAction, 30000);
  }

  protected override get startingTime(): number {
    return 0;
  }

  private stopEngineAfterSchedulerFrames(): Observable<unknown> {
    return this.starting$
      .pipe(
        mergeMap(() => timer(this.executionScheduler.frame, this.playingScheduler)),
        mergeMap(() => timer(100)),
        tap(() => this.stop())
      );
  }
}


class VizualRxVirtualTimeEngineObserver implements VizualRxRemoteObserver {
  readonly id: string;
  readonly label: string;

  constructor(private timestampProvider: TimestampProvider, private playingScheduler: VizualRxScaledTimeScheduler,
              private observer: VizualRxObserver) {
    this.id = observer.id;
    this.label = observer.label;
  }

  get next$(): Observable<VizualRxRemoteNextNotification> {
    return this.observer.next$
      .pipe(
        map(value => ({
          time: this.timestampProvider.now(),
          value
        })),
        delayWhen(value => {
          if (Number.isFinite(this.playingScheduler.scaledTime.timeFactor)) {
            return timer(value.time, this.playingScheduler);
          } else {
            return of(1);
          }
        })
      );
  }

  get error$(): Observable<VizualRxRemoteErrorNotification> {
    return this.observer.error$
      .pipe(
        map(err => ({
          time: this.timestampProvider.now(),
          err
        })),
        delayWhen(value => {
          if (Number.isFinite(this.playingScheduler.scaledTime.timeFactor)) {
            return timer(value.time, this.playingScheduler)
          } else {
            return of(1);
          }
        })
      );
  }

  get complete$(): Observable<VizualRxRemoteNotification> {
    return this.observer.complete$
      .pipe(
        map(() => ({
          time: this.timestampProvider.now()
        })),
        delayWhen(value => {
          if (Number.isFinite(this.playingScheduler.scaledTime.timeFactor)) {
            return timer(value.time, this.playingScheduler);
          } else {
            return of(1);
          }
        })
      );
  }
}
