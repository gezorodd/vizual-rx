import {BehaviorSubject, Observable} from "rxjs";

export class VizualRxTime {

  private readonly _timeFactor$ = new BehaviorSubject<number>(1);
  private previousTime: number;
  private previousVirtualTime: number;

  constructor() {
    this.previousTime = this.previousVirtualTime = new Date().getTime();
  }

  get timeFactor$(): Observable<number> {
    return this._timeFactor$;
  }

  get timeFactor(): number {
    return this._timeFactor$.value;
  }

  set timeFactor(value: number) {
    if (value === this._timeFactor$.value) {
      return;
    }
    this.previousVirtualTime = this.virtualNow();
    this.previousTime = new Date().getTime();
    this._timeFactor$.next(value);
  }

  virtualNow(): number {
    const currentTime = new Date().getTime();
    const diff = currentTime - this.previousTime;
    const virtualDiff = this._timeFactor$.value * diff;
    return this.previousVirtualTime + virtualDiff;
  }
}
