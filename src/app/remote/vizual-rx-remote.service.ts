import {VizualRxRemote} from "./vizual-rx-remote.model";
import {VizualRxRemoteEngine} from "./vizual-rx-remote-engine";

// import {VizualRxWorkerEngineClient} from "./vizual-rx-worker-engine-client";

export class VizualRxRemoteService {

  constructor(private enableWebWorker: boolean) {
  }

  createRemote(): VizualRxRemote {
    // if (this.enableWebWorker && typeof Worker !== 'undefined') {
    //   return new VizualRxWorkerEngineClient();
    // } else {
    return new VizualRxRemoteEngine();
    // }
  }
}
