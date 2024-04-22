import {BehaviorSubject, Observable} from "rxjs";

export class VizualRxScaledTime {
  static defaultTimeFactor = 1;

  private readonly _timeFactor$ = new BehaviorSubject<number>(1);
  private previousTime: number;
  private previousScaledTime: number;

  constructor() {
    this.previousTime = this.previousScaledTime = new Date().getTime();
  }

  reset(): void {
    this.previousTime = this.previousScaledTime = new Date().getTime();
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
    this.previousScaledTime = this.scaledNow();
    this.previousTime = new Date().getTime();
    this._timeFactor$.next(value);
  }

  scaledNow(): number {
    const currentTime = new Date().getTime();
    const diff = currentTime - this.previousTime;
    const scaledDiff = this._timeFactor$.value * diff;
    return this.previousScaledTime + scaledDiff;
  }
}
