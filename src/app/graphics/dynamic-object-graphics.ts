import {vizualRxScheduler} from "../core/vizual-rx-scheduler";

export abstract class DynamicObjectGraphics {
  readonly layerIndex: number;
  readonly time: number;
  private _groupContainer?: SVGGElement;

  protected constructor(layerIndex = 0) {
    this.time = vizualRxScheduler.now();
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
    const diff = vizualRxScheduler.now() - this.time;
    const position = diff / 10;
    this.groupContainer.style.transform = `translate(${position}px, 0)`;
  }
}
