import {TrackGraphics} from "../track-graphics";
import {ObserverValueGraphics} from "./observer-value-graphics";
import {catchError, EMPTY, merge, takeUntil, tap} from "rxjs";
import {ObserverCompleteGraphics} from "./observer-complete-graphics";
import {ObserverErrorGraphics} from "./observer-error-graphics";
import {DynamicObjectGraphics} from "../dynamic-object-graphics";
import {ObserverStackGraphics} from "./observer-stack-graphics";
import {VizualRxEngine, VizualRxEngineObserver} from "../../core/vizual-rx-engine";

export class ObserverTrackGraphics extends TrackGraphics {
  private readonly observer: VizualRxEngineObserver;
  private lastAddedStackableObject?: DynamicObjectGraphics;

  constructor(engine: VizualRxEngine, observer: VizualRxEngineObserver, svg: SVGSVGElement) {
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
    this.trackContainer.insertBefore(line, this.scene.root);
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
          const valueGraphics = new ObserverValueGraphics(notification);
          this.addDynamicObject(valueGraphics);
        })
      );
  }

  private createCompletedGraphicsWhenCompleted() {
    return this.observer.complete$
      .pipe(
        catchError(() => EMPTY),
        tap(notification => {
          const completedGraphics = new ObserverCompleteGraphics(notification);
          this.addDynamicObject(completedGraphics);
        })
      )
  }

  private createErroredGraphicsWhenErrored() {
    return this.observer.error$
      .pipe(
        tap(notification => {
          const erroredGraphics = new ObserverErrorGraphics(notification);
          this.addDynamicObject(erroredGraphics);
        })
      )
  }

  override addDynamicObject(dynamicObject: DynamicObjectGraphics) {
    if (this.shouldStackObject(dynamicObject)) {
      let observerStackGraphics: ObserverStackGraphics;
      if (this.lastAddedStackableObject instanceof ObserverStackGraphics) {
        observerStackGraphics = this.lastAddedStackableObject;
      } else {
        observerStackGraphics = new ObserverStackGraphics(dynamicObject.time);
        super.addDynamicObject(observerStackGraphics);
        this.removeDynamicObject(this.lastAddedStackableObject!);
        observerStackGraphics.addItem(this.lastAddedStackableObject!);
        this.lastAddedStackableObject = observerStackGraphics;
      }
      observerStackGraphics.addItem(dynamicObject);
      observerStackGraphics.update(dynamicObject.time);
    } else {
      super.addDynamicObject(dynamicObject);
      this.lastAddedStackableObject = dynamicObject;
    }
  }

  private shouldStackObject(dynamicObject: DynamicObjectGraphics): boolean {
    if (!this.isStackable(dynamicObject) || !this.lastAddedStackableObject || !this.isStackable(this.lastAddedStackableObject)) {
      return false;
    }
    const diff = Math.abs(dynamicObject.time - this.lastAddedStackableObject.time);
    return diff < 50;
  }

  private isStackable(dynamicObject: DynamicObjectGraphics): boolean {
    return dynamicObject instanceof ObserverValueGraphics || dynamicObject instanceof ObserverErrorGraphics ||
      dynamicObject instanceof ObserverStackGraphics;
  }
}
