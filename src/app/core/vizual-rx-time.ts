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

  get data(): VizualRxTimeData {
    return {
      timeFactor: this.timeFactor,
      previousTime: this.previousTime,
      previousVirtualTime: this.previousVirtualTime,
      exportedAt: new Date().getTime()
    };
  }

  set data(value: VizualRxTimeData) {
    const timeDrift = new Date().getTime() - value.exportedAt;
    this.previousTime = value.previousTime + timeDrift;
    this.previousVirtualTime = value.previousVirtualTime;
    if (value.timeFactor !== this._timeFactor$.value) {
      this._timeFactor$.next(value.timeFactor);
    }
  }
}

export interface VizualRxTimeData {
  readonly timeFactor: number;
  readonly previousTime: number;
  readonly previousVirtualTime: number;
  readonly exportedAt: number;
}
