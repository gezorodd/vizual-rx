import {VizualRxTime} from "./vizual-rx-time";

export class VizualRxTimeFactoryHistory {
  readonly time: number;
  readonly timeFactor: number;

  constructor() {
    this.time = new Date().getTime();
    this.timeFactor = VizualRxTime.timeFactor;
  }
}
