import {VizualRxRemote} from "./vizual-rx-remote.model";
import {VizualRxRemoteEngine} from "./vizual-rx-remote-engine";
import {VizualRxRemoteWorker} from "./vizual-rx-remote-worker";

export class VizualRxRemoteService {

  constructor(private disableWebWorker: boolean = false) {
  }

  createRemote(disableWebWorker: boolean = false): VizualRxRemote {
    if (this.isWebWorkerSupported() && !this.isWebWorkerDisabled() && !disableWebWorker) {
      return new VizualRxRemoteWorker();
    } else {
      return new VizualRxRemoteEngine();
    }
  }

  isWebWorkerSupported(): boolean {
    return typeof Worker !== 'undefined';
  }

  isWebWorkerDisabled(): boolean {
    return this.disableWebWorker;
  }
}
