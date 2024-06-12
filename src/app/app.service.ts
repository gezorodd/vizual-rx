import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {MatDrawerMode} from "@angular/material/sidenav";
import {SCREEN_WIDTH_BREAKPOINT_SIDENAV_MODE} from "./ui/responsive/responsive";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly sidenavOpenedState$: BehaviorSubject<boolean>;
  readonly sidenavOpenedChanged$: Subject<void>;

  constructor() {
    const defaultOpened = this.getSidenavMode() !== 'over';
    this.sidenavOpenedState$ = new BehaviorSubject<boolean>(defaultOpened);
    this.sidenavOpenedChanged$ = new Subject<void>();
  }

  getSidenavMode(): MatDrawerMode {
    if (window.innerWidth <= SCREEN_WIDTH_BREAKPOINT_SIDENAV_MODE) {
      return 'over';
    } else {
      return 'side';
    }
  }
}
