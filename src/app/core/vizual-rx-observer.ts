import {Observable, Observer, ReplaySubject, SubscriptionLike} from "rxjs";

export class VizualRxObserver implements Observer<any>, SubscriptionLike {
  private static idSeq = 1;

  readonly id: string;
  readonly label: string;
  private readonly _next$: ReplaySubject<any>;
  private readonly _error$: ReplaySubject<any>;
  private readonly _complete$: ReplaySubject<void>;
  closed: boolean;
  paused: boolean;

  constructor(name: string) {
    this.id = 'observer_' + VizualRxObserver.idSeq++;
    this.label = name;
    this._next$ = new ReplaySubject<any>();
    this._error$ = new ReplaySubject<any>();
    this._complete$ = new ReplaySubject<void>();
    this.closed = false;
    this.paused = false;
  }

  next(value: any): void {
    if (!this.paused) {
      this._next$.next(value);
    }
  }

  error(err: any): void {
    if (!this.paused) {
      this._error$.next(err);
      this.closed = true;
    }
  }

  complete(): void {
    if (!this.paused) {
      this._complete$.next();
      this.closed = true;
    }
  }

  unsubscribe(): void {
    this.closed = true;
  }

  get next$(): Observable<any> {
    return this._next$.asObservable();
  }

  get error$(): Observable<any> {
    return this._error$.asObservable();
  }

  get complete$(): Observable<void> {
    return this._complete$.asObservable();
  }
}
