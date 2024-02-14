import {TrackGraphics} from "../track-graphics";
import {VizualRxEngine} from "../../core/vizual-rx-engine";
import {map, mergeMap, mergeWith, of, takeUntil, tap} from "rxjs";
import {TimeTrackTickGraphics} from "./time-track-tick-graphics";
import {vizualRxProxies} from "../../core/vizual-rx-proxies";

export class TimeTrackGraphics extends TrackGraphics {

  constructor(engine: VizualRxEngine, svg: SVGSVGElement) {
    super(engine, svg, 'time-track');
  }

  override init() {
    super.init();
    this.createTimeLine();
    this.createTicksEverySecondAfterEngineStart()
      .subscribe();
  }

  private createTimeLine(): void {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.classList.add('arrow-line');
    line.setAttribute('x2', `${this.svg.clientWidth - 3}`);
    this.trackContainer.appendChild(line);

    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    arrow.classList.add('arrow');
    arrow.setAttribute('d', 'M0,0 L-20,10 L-10,0 L-20,-10');
    arrow.style.transform = `translate(${this.svg.clientWidth}px, 0)`;
    this.trackContainer.appendChild(arrow);
  }

  private createTicksEverySecondAfterEngineStart() {
    return this.engine.starting$
      .pipe(
        mergeMap(() => {
          return of(0)
            .pipe(
              tap(() => this.clearDynamicObjects()),
              mergeWith(
                vizualRxProxies.interval(1000)
                  .pipe(
                    map(value => value + 1),
                    takeUntil(this.engine.stopping$)
                  )
              ),
              tap(value => {
                this.addDynamicObject(new TimeTrackTickGraphics(new Date().getTime(), value));
              })
            );
        }),
        takeUntil(this.destroy$)
      );
  }
}
