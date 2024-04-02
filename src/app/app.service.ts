import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly sidenavOpenedState$: BehaviorSubject<boolean>;
  readonly sidenavOpenedChanged$: Subject<void>;

  constructor() {
    this.sidenavOpenedState$ = new BehaviorSubject<boolean>(true);
    this.sidenavOpenedChanged$ = new Subject<void>();
  }
}
