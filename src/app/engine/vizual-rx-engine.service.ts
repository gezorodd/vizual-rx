import {Injectable} from '@angular/core';
import {VizualRxEngine} from "./vizual-rx-engine.model";
import {VizualRxCoreEngineAdapter} from "./vizual-rx-core-engine-adapter";

@Injectable({
  providedIn: 'root'
})
export class VizualRxEngineService {

  constructor() {
  }

  createEngine(): VizualRxEngine {
    return new VizualRxCoreEngineAdapter();
  }
}
