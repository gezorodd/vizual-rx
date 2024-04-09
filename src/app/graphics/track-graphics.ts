import {interval, merge, of, Subject, takeUntil} from "rxjs";
import {DynamicObjectGraphics} from "./dynamic-object-graphics";
import {VizualRxRemote} from "../remote/vizual-rx-remote.model";

export class TrackGraphics {
  protected readonly remote: VizualRxRemote;
  protected readonly svg: SVGSVGElement;
  protected readonly dynamicObjects: DynamicObjectGraphics[];
  protected trackContainer!: SVGGElement;
  protected sceneContainer!: SVGGElement;
  protected sceneLayers: Map<number, SVGGElement>;
  protected readonly destroy$ = new Subject<void>();
  private readonly className: string;
  private updateIntervalId?: ReturnType<typeof setInterval>;

  constructor(remote: VizualRxRemote, svg: SVGSVGElement, className: string) {
    this.remote = remote;
    this.svg = svg;
    this.dynamicObjects = [];
    this.className = className;
    this.sceneLayers = new Map<number, SVGGElement>();
  }


  init(): void {
    this.trackContainer = this.createTrackContainer();
    this.sceneContainer = this.createSceneContainer();

    this.startUpdateLoop();
    this.removeOutboundDynamicObjectsAtInterval();
  }

  addDynamicObject(dynamicObject: DynamicObjectGraphics): void {
    this.dynamicObjects.push(dynamicObject);
    const sceneLayer = this.getSceneLayer(dynamicObject.layerIndex);
    sceneLayer.appendChild(dynamicObject.groupContainer);
  }

  removeDynamicObject(dynamicObject: DynamicObjectGraphics): void {
    const sceneLayer = this.getSceneLayer(dynamicObject.layerIndex);
    sceneLayer.removeChild(dynamicObject.groupContainer);
    const index = this.dynamicObjects.indexOf(dynamicObject);
    if (index !== -1) {
      this.dynamicObjects.splice(index, 1);
    }
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
    if (this.updateIntervalId) {
      clearInterval(this.updateIntervalId);
    }
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

  private startUpdateLoop() {
    merge(of(undefined), this.remote.starting$)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.updateIntervalId) {
          clearInterval(this.updateIntervalId);
        }
        this.updateIntervalId = setInterval(() => {
          if (this.remote.playing) {
            this.update();
          }
        }, 15);
      });
    this.remote.stopping$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.updateIntervalId) {
          clearInterval(this.updateIntervalId);
        }
      });
  }

  private update(): void {
    this.dynamicObjects.forEach(dynamicObject => {
      dynamicObject.update();
    });
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

