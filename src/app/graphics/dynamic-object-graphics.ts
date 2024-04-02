import {BehaviorSubject} from "rxjs";
import {VizualRxTime} from "../core/vizual-rx-time";

export abstract class DynamicObjectGraphics {
  static timeScale$ = new BehaviorSubject(1);
  readonly layerIndex: number;
  readonly time: number;
  private _groupContainer?: SVGGElement;

  protected constructor(private vizualRxTime: VizualRxTime, layerIndex = 0) {
    this.time = this.vizualRxTime.virtualNow();
    this.layerIndex = layerIndex;
  }

  get groupContainer(): SVGGElement {
    if (!this._groupContainer) {
      this._groupContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      this.init(this._groupContainer);
    }
    return this._groupContainer;
  }

  protected abstract init(groupContainer: SVGGElement): void

  update(): void {
    const diff = this.vizualRxTime.virtualNow() - this.time;
    const position = (diff / 10) * DynamicObjectGraphics.timeScale$.value;
    this.groupContainer.style.transform = `translate(${position}px, 0)`;
  }
}
