import {TrackGraphics} from "../track-graphics";
import {interval, mergeMap, takeUntil, tap} from "rxjs";
import {TimeTrackTickGraphics} from "./time-track-tick-graphics";
import {VizualRxRemote} from "../../remote/vizual-rx-remote.model";

export class TimeTrackGraphics extends TrackGraphics {

  startTime: number;
  lastTickSeconds?: number;

  constructor(remote: VizualRxRemote, svg: SVGSVGElement) {
    super(remote, svg, 'time-track');
    this.startTime = remote.now();
  }

  override init() {
    super.init();

    this.remote.starting$
      .pipe(
        tap(() => {
          this.clearDynamicObjects();
          this.startTime = this.remote.now();
          this.lastTickSeconds = undefined;
        }),
        mergeMap(() =>
          interval(20)
            .pipe(
              tap(() => this.addNewTicks()),
              takeUntil(this.remote.stopping$)
            )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private addNewTicks(): void {
    const now = this.remote.now();
    const diff = now - this.startTime;
    const diffSeconds = Math.floor(diff / 100) / 10;
    while (this.lastTickSeconds === undefined || (diffSeconds > this.lastTickSeconds)) {
      let tickSeconds: number;
      if (this.lastTickSeconds === undefined) {
        tickSeconds = 0;
      } else {
        tickSeconds = Math.round((this.lastTickSeconds + 0.1) * 10) / 10;
      }
      const tickTime = this.startTime + (tickSeconds * 1000);
      this.addDynamicObject(new TimeTrackTickGraphics(this.remote, tickTime, tickSeconds));
      this.lastTickSeconds = tickSeconds;
    }
  }
}
