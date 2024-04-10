import {VizualRxRemote} from "./vizual-rx-remote.model";
import {VizualRxRemoteEngine} from "./vizual-rx-remote-engine";
import {VizualRxRemoteWorker} from "./vizual-rx-remote-worker";

export class VizualRxRemoteService {

  constructor(private disabledWebWorkers?: boolean) {
  }

  createRemote(): VizualRxRemote {
    if (typeof Worker !== 'undefined' && !this.disabledWebWorkers) {
      return new VizualRxRemoteWorker();
    } else {
      return new VizualRxRemoteEngine();
    }
  }
}
