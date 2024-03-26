import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {playgroundPage} from "../pages/playground/playground.page";

@Injectable({
  providedIn: 'root'
})
export class VizualRxPageService {

  playgroundCode$: BehaviorSubject<string>

  constructor() {
    this.playgroundCode$ = new BehaviorSubject<string>(playgroundPage.sampleCode);
  }

  set playgroundCode(value: string) {
    this.playgroundCode$.next(value);
  }

  get playgroundCode(): string {
    return this.playgroundCode$.value;
  }
}
