import {TrackGraphics} from "../track-graphics";
import {interval, map, mergeMap, mergeWith, of, takeUntil, tap} from "rxjs";
import {TimeTrackTickGraphics} from "./time-track-tick-graphics";
import {VizualRxEngine} from "../../engine/vizual-rx-engine.model";

export class TimeTrackGraphics extends TrackGraphics {

  constructor(engine: VizualRxEngine, svg: SVGSVGElement) {
    super(engine, svg, 'time-track');
  }

  override init() {
    super.init();
    this.createTicksEverySecondAfterEngineStart()
      .subscribe();
  }

  private createTicksEverySecondAfterEngineStart() {
    return this.engine.starting$
      .pipe(
        mergeMap(() => {
          return of(0)
            .pipe(
              tap(() => this.clearDynamicObjects()),
              mergeWith(
                interval(100, this.engine.scheduler)
                  .pipe(
                    map(value => value + 1),
                    takeUntil(this.engine.stopping$)
                  )
              ),
              tap(value => {
                this.addDynamicObject(new TimeTrackTickGraphics(this.engine.scheduler, value / 10));
              })
            );
        }),
        takeUntil(this.destroy$)
      );
  }
}
