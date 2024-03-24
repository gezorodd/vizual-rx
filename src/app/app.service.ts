import {Injectable} from '@angular/core';
import {VizualRxEngine} from "./core/vizual-rx-engine";
import {codeSamples} from "./vizual-rx-editor/code-samples";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly engine: VizualRxEngine;

  constructor() {
    this.engine = new VizualRxEngine(codeSamples[0].code);
  }
}
