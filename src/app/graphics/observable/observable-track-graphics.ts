import {TrackGraphics} from "../track-graphics";
import {VizualRxEngine} from "../../core/vizual-rx-engine";
import {ObservableValueGraphics} from "./observable-value-graphics";
import {catchError, EMPTY, merge, takeUntil, tap} from "rxjs";
import {VizualRxObservable} from "../../core/vizual-rx-observable";
import {ObservableCompletedGraphics} from "./observable-completed-graphics";
import {ObservableErroredGraphics} from "./observable-errored-graphics";

export class ObservableTrackGraphics extends TrackGraphics {
  private readonly observable: VizualRxObservable;

  constructor(engine: VizualRxEngine, observable: VizualRxObservable, svg: SVGSVGElement) {
    super(engine, svg, 'observable-track');
    this.observable = observable;
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
    return this.observable.observable$
      .pipe(
        catchError(() => EMPTY),
        tap(value => {
          const time = new Date().getTime();
          const valueGraphics = new ObservableValueGraphics(time, value);
          this.addDynamicObject(valueGraphics);
        })
      );
  }

  private createCompletedGraphicsWhenCompleted() {
    return this.observable.completed$
      .pipe(
        catchError(() => EMPTY),
        tap(() => {
          const time = new Date().getTime();
          const completedGraphics = new ObservableCompletedGraphics(time);
          this.addDynamicObject(completedGraphics);
        })
      )
  }

  private createErroredGraphicsWhenErrored() {
    return this.observable.errored$
      .pipe(
        tap(() => {
          const time = new Date().getTime();
          const erroredGraphics = new ObservableErroredGraphics(time);
          this.addDynamicObject(erroredGraphics);
        })
      )
  }
}
