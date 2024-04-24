import {interval, Subject, takeUntil} from "rxjs";
import {DynamicObjectGraphics} from "./dynamic-object-graphics";
import {LayeredContainer} from "./layered-container";
import {VizualRxEngine} from "../core/vizual-rx-engine";

export class TrackGraphics {
  protected readonly engine: VizualRxEngine;
  protected readonly svg: SVGSVGElement;
  protected readonly dynamicObjects: DynamicObjectGraphics[];
  protected trackContainer!: SVGGElement;
  protected scene!: LayeredContainer;
  protected readonly destroy$ = new Subject<void>();
  private readonly className: string;
  private updateIntervalId?: ReturnType<typeof setInterval>;

  constructor(engine: VizualRxEngine, svg: SVGSVGElement, className: string) {
    this.engine = engine;
    this.svg = svg;
    this.dynamicObjects = [];
    this.className = className;
  }


  init(): void {
    this.trackContainer = this.createTrackContainer();
    this.scene = this.createScene();
    this.removeOutboundDynamicObjectsAtInterval();
  }

  update(now: number): void {
    this.dynamicObjects.forEach(dynamicObject => {
      dynamicObject.update(now);
    });
  }

  destroy(): void {
    this.trackContainer.remove();
    this.destroy$.next();
    this.destroy$.complete();
    if (this.updateIntervalId) {
      clearInterval(this.updateIntervalId);
    }
  }

  addDynamicObject(dynamicObject: DynamicObjectGraphics): void {
    this.dynamicObjects.push(dynamicObject);
    this.scene.addObject(dynamicObject);
  }

  removeDynamicObject(dynamicObject: DynamicObjectGraphics): void {
    this.scene.removeObject(dynamicObject);
    const index = this.dynamicObjects.indexOf(dynamicObject);
    if (index !== -1) {
      this.dynamicObjects.splice(index, 1);
    }
  }

  clearDynamicObjects(): void {
    this.dynamicObjects.forEach(dynamicObject => this.scene.removeObject(dynamicObject));
    this.dynamicObjects.splice(0, this.dynamicObjects.length);
  }

  private createTrackContainer(): SVGGElement {
    const trackContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    trackContainer.classList.add('track-container');
    trackContainer.classList.add(this.className);
    this.svg.appendChild(trackContainer);
    return trackContainer;
  }

  private createScene(): LayeredContainer {
    const sceneContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    sceneContainer.classList.add('scene-container');
    this.trackContainer.appendChild(sceneContainer);

    const startLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    startLine.setAttribute('y1', '-50');
    startLine.setAttribute('y2', '50');
    startLine.classList.add('start-line')
    sceneContainer.appendChild(startLine);
    return new LayeredContainer(sceneContainer);
  }

  private removeOutboundDynamicObjectsAtInterval(): void {
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const parentBoundingRect = this.trackContainer.viewportElement?.getBoundingClientRect();
        if (parentBoundingRect) {
          const outboundObjects = this.dynamicObjects
            .filter(dynamicObject => {
              const objectBoundingRect = dynamicObject.groupContainer.getBoundingClientRect();
              return objectBoundingRect.x > (parentBoundingRect.x + parentBoundingRect.width);
            });
          outboundObjects
            .forEach(dynamicObject => this.removeDynamicObject(dynamicObject));
        }
      });
  }
}

