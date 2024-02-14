import {BehaviorSubject, Observable} from "rxjs";

export class VizualRxTime {
  private static readonly instance = new VizualRxTime();

  private readonly _timeFactor$ = new BehaviorSubject<number>(1);
  private previousTime: number;
  private previousVirtualTime: number;

  constructor() {
    this.previousTime = this.previousVirtualTime = new Date().getTime();
  }

  static get timeFactor$(): Observable<number> {
    return this.instance._timeFactor$;
  }

  static set timeFactor(value: number) {
    this.instance.timeFactor = value;
  }

  static get timeFactor(): number {
    return this.instance._timeFactor$.value;
  }

  static virtualNow(): number {
    return this.instance.virtualNow();
  }

  private set timeFactor(value: number) {
    if (value === this._timeFactor$.value) {
      return;
    }
    this.previousVirtualTime = this.virtualNow();
    this.previousTime = new Date().getTime();
    this._timeFactor$.next(value);
  }

  private virtualNow(): number {
    const currentTime = new Date().getTime();
    const diff = this.previousTime - currentTime;
    const virtualDiff = this.timeFactor * diff;
    return this.previousVirtualTime + virtualDiff;
  }
}
