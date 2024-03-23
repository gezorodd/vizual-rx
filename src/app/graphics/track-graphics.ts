import {filter, interval, merge, Observable, Subject, takeUntil, tap} from "rxjs";
import {DynamicObjectGraphics} from "./dynamic-object-graphics";
import {VizualRxEngine} from "../core/vizual-rx-engine";

export class TrackGraphics {
  protected readonly engine: VizualRxEngine;
  protected readonly svg: SVGSVGElement;
  protected readonly dynamicObjects: DynamicObjectGraphics[];
  protected trackContainer!: SVGGElement;
  protected sceneContainer!: SVGGElement;
  protected sceneLayers: Map<number, SVGGElement>;
  protected readonly destroy$ = new Subject<void>();
  private readonly className: string;

  constructor(engine: VizualRxEngine, svg: SVGSVGElement, className: string) {
    this.engine = engine;
    this.svg = svg;
    this.dynamicObjects = [];
    this.className = className;
    this.sceneLayers = new Map<number, SVGGElement>();
  }


  init(): void {
    this.trackContainer = this.createTrackContainer();
    this.sceneContainer = this.createSceneContainer();

    this.scheduleUpdate()
      .subscribe();
  }

  addDynamicObject(dynamicObject: DynamicObjectGraphics): void {
    this.dynamicObjects.push(dynamicObject);
    const sceneLayer = this.getSceneLayer(dynamicObject.layerIndex);
    sceneLayer.appendChild(dynamicObject.groupContainer);
  }

  clearDynamicObjects(): void {
    this.dynamicObjects.forEach(dynamicObject => {
      const sceneLayer = this.getSceneLayer(dynamicObject.layerIndex);
      sceneLayer.removeChild(dynamicObject.groupContainer);
    });
    this.dynamicObjects.splice(0, this.dynamicObjects.length);
  }

  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createTrackContainer(): SVGGElement {
    const trackContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    trackContainer.classList.add('track-container');
    trackContainer.classList.add(this.className);
    this.svg.appendChild(trackContainer);
    return trackContainer;
  }

  private createSceneContainer(): SVGGElement {
    const sceneContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    sceneContainer.classList.add('scene-container');
    this.trackContainer.appendChild(sceneContainer);

    const startLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    startLine.setAttribute('y1', '-50');
    startLine.setAttribute('y2', '50');
    startLine.classList.add('start-line')
    sceneContainer.appendChild(startLine);
    return sceneContainer;
  }

  private getSceneLayer(index: number): SVGGElement {
    let sceneLayer = this.sceneLayers.get(index);
    if (!sceneLayer) {
      sceneLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      this.sceneLayers.set(index, sceneLayer);

      const indexedSortedHighestFirst = [...this.sceneLayers.keys()].sort().reverse();
      if (indexedSortedHighestFirst.length === 0 || indexedSortedHighestFirst[0] < index) {
        this.sceneContainer.appendChild(sceneLayer);
      } else {
        let insertBefore: SVGGElement | undefined;
        for (let otherIndex of indexedSortedHighestFirst) {
          if (index < otherIndex) {
            insertBefore = this.sceneLayers.get(otherIndex);
          } else {
            break;
          }
        }
        this.sceneContainer.insertBefore(sceneLayer, insertBefore!);
      }
    }
    return sceneLayer;
  }

  private scheduleUpdate(): Observable<number> {
    return merge(
      interval(15)
        .pipe(filter(() => this.engine.playing)),
      DynamicObjectGraphics.timeScale$
    ).pipe(
      tap(() => this.update()),
      takeUntil(this.destroy$)
    );
  }

  private update(): void {
    this.dynamicObjects.forEach(dynamicObject => dynamicObject.update());
  }
}

