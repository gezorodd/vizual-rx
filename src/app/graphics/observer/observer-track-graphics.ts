import {TrackGraphics} from "../track-graphics";
import {VizualRxEngine} from "../../core/vizual-rx-engine";
import {ObserverNextGraphics} from "./observer-next-graphics";
import {catchError, EMPTY, merge, takeUntil, tap} from "rxjs";
import {ObserverCompleteGraphics} from "./observer-complete-graphics";
import {ObserverErrorGraphics} from "./observer-error-graphics";
import {VizualRxObserver} from "../../core/vizual-rx-observer";

export class ObserverTrackGraphics extends TrackGraphics {
  private readonly observer: VizualRxObserver;

  constructor(engine: VizualRxEngine, observer: VizualRxObserver, svg: SVGSVGElement) {
    super(engine, svg, 'observer-track');
    this.observer = observer;
  }

  override init() {
    super.init();
    this.createCenterLine();
    this.createErrorColorFilter();

    merge(
      this.createValueGraphicsWhenEmitted(),
      this.createCompletedGraphicsWhenCompleted(),
      this.createErroredGraphicsWhenErrored()
    ).pipe(
      takeUntil(this.engine.stopping$),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  private createCenterLine() {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.classList.add('center-line');
    line.setAttribute('x2', `${this.svg.clientWidth}`);
    this.trackContainer.insertBefore(line, this.sceneContainer);
  }

  private createErrorColorFilter() {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    this.svg.insertBefore(defs, this.trackContainer);

    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.id = 'error-color';
    defs.appendChild(filter);

    const feColorMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
    feColorMatrix.setAttribute('in', 'SourceGraphic');
    feColorMatrix.setAttribute('type', 'matrix');
    feColorMatrix.setAttribute('values', '' +
      '0 0 0 0 0.5 ' +
      '0 0 0 0 0.02 ' +
      '0 0 0 0 0.02 ' +
      '0 0 0 1 0');
    filter.appendChild(feColorMatrix);
  }

  private createValueGraphicsWhenEmitted() {
    return this.observer.next$
      .pipe(
        catchError(() => EMPTY),
        tap(value => {
          const valueGraphics = new ObserverNextGraphics(value);
          this.addDynamicObject(valueGraphics);
        })
      );
  }

  private createCompletedGraphicsWhenCompleted() {
    return this.observer.complete$
      .pipe(
        catchError(() => EMPTY),
        tap(() => {
          const completedGraphics = new ObserverCompleteGraphics();
          this.addDynamicObject(completedGraphics);
        })
      )
  }

  private createErroredGraphicsWhenErrored() {
    return this.observer.error$
      .pipe(
        tap(() => {
          const erroredGraphics = new ObserverErrorGraphics();
          this.addDynamicObject(erroredGraphics);
        })
      )
  }
}
