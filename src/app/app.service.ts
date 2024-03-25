import {Injectable} from '@angular/core';
import {VizualRxEngine} from "./core/vizual-rx-engine";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly engine: VizualRxEngine;
  readonly sidenavOpenedState$: BehaviorSubject<boolean>;
  readonly sidenavOpenedChanged$: Subject<void>;

  constructor() {
    this.engine = new VizualRxEngine();
    this.sidenavOpenedState$ = new BehaviorSubject<boolean>(true);
    this.sidenavOpenedChanged$ = new Subject<void>();
  }
}
