import {VizualRxTimeFactoryHistory} from "../core/vizual-rx-time-factory-history";

export abstract class DynamicObjectGraphics {
  readonly layerIndex: number;
  readonly time: number;
  private _groupContainer?: SVGGElement;

  protected constructor(time: number, layerIndex = 0) {
    this.time = time;
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

  update(timeFactorHistory: VizualRxTimeFactoryHistory[]): void {
    let timeCursor = new Date().getTime();
    let transformedDiff = 0;

    for (let i = timeFactorHistory.length - 1; i >= 0; i--) {
      const historyEntry = timeFactorHistory[i];
      if (historyEntry.time < this.time) {
        const diff = timeCursor - this.time;
        transformedDiff += (diff * historyEntry.timeFactor);
        break;
      } else {
        const diff = timeCursor - historyEntry.time;
        transformedDiff += (diff * historyEntry.timeFactor);
        timeCursor = historyEntry.time;
      }
    }

    const position = transformedDiff / 10;
    this.groupContainer.style.transform = `translate(${position}px, 0)`;
  }
}
