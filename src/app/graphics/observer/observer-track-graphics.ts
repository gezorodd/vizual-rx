import {TrackGraphics} from "../track-graphics";
import {ObserverValueGraphics} from "./observer-value-graphics";
import {catchError, EMPTY, merge, takeUntil, tap} from "rxjs";
import {ObserverCompleteGraphics} from "./observer-complete-graphics";
import {ObserverErrorGraphics} from "./observer-error-graphics";
import {VizualRxRemote, VizualRxRemoteObserver} from "../../remote/vizual-rx-remote.model";

export class ObserverTrackGraphics extends TrackGraphics {
  private readonly observer: VizualRxRemoteObserver;

  constructor(remote: VizualRxRemote, observer: VizualRxRemoteObserver, svg: SVGSVGElement) {
    super(remote, svg, 'observer-track');
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
      takeUntil(this.remote.stopping$),
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
        tap(notification => {
          const valueGraphics = new ObserverValueGraphics(this.remote, notification);
          this.addDynamicObject(valueGraphics);
        })
      );
  }

  private createCompletedGraphicsWhenCompleted() {
    return this.observer.complete$
      .pipe(
        catchError(() => EMPTY),
        tap(notification => {
          const completedGraphics = new ObserverCompleteGraphics(this.remote, notification);
          this.addDynamicObject(completedGraphics);
        })
      )
  }

  private createErroredGraphicsWhenErrored() {
    return this.observer.error$
      .pipe(
        tap(notification => {
          const erroredGraphics = new ObserverErrorGraphics(this.remote, notification);
          this.addDynamicObject(erroredGraphics);
        })
      )
  }
}
