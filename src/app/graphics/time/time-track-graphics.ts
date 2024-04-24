import {TrackGraphics} from "../track-graphics";
import {merge, Observable, takeUntil, tap} from "rxjs";
import {TimeTrackTickGraphics} from "./time-track-tick-graphics";

import {VizualRxEngine} from "../../core/vizual-rx-engine";

export class TimeTrackGraphics extends TrackGraphics {

  lastTickSeconds?: number;

  constructor(engine: VizualRxEngine, svg: SVGSVGElement) {
    super(engine, svg, 'time-track');
  }

  override init() {
    super.init();

    merge(
      this.resetTicksOnStarting(),
      this.addTicksOnAnimation()
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }

  private resetTicksOnStarting(): Observable<unknown> {
    return this.engine.starting$
      .pipe(
        tap(time => {
          this.clearDynamicObjects();
          this.lastTickSeconds = undefined;
        })
      );
  }

  private addTicksOnAnimation(): Observable<unknown> {
    return this.engine.animation$
      .pipe(
        tap(time => this.addNewTicks(time))
      );
  }

  private addNewTicks(time: number): void {
    const diffSeconds = Math.floor(time / 100) / 10;
    while (this.lastTickSeconds === undefined || (diffSeconds > this.lastTickSeconds)) {
      let tickSeconds: number;
      if (this.lastTickSeconds === undefined) {
        tickSeconds = 0;
      } else {
        tickSeconds = Math.round((this.lastTickSeconds + 0.1) * 10) / 10;
      }
      const tick = new TimeTrackTickGraphics(tickSeconds * 1000, tickSeconds);
      this.addDynamicObject(tick);
      tick.update(time);
      this.lastTickSeconds = tickSeconds;
    }
  }
}
