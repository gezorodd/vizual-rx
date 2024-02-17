import {Observable, Observer, ReplaySubject, Subject, Subscription, SubscriptionLike} from "rxjs";

export class VizualRxObserver implements Observer<any>, SubscriptionLike {
  readonly label: string;
  private readonly _next$: ReplaySubject<any>;
  private readonly _error$: ReplaySubject<any>;
  private readonly _complete$: ReplaySubject<void>;
  subscription?: Subscription;
  closed: boolean;

  constructor(name: string) {
    this.label = name;
    this._next$ = new ReplaySubject();
    this._error$ = new ReplaySubject();
    this._complete$ = new ReplaySubject();
    this.closed = false;
  }

  next(value: any): void {
    this._next$.next(value);
  }

  error(err: any): void {
    this._error$.next(err);
    this.closed = true;
  }

  complete(): void {
    this._complete$.next();
    this.closed = true;
  }

  unsubscribe(): void {
    this.subscription?.unsubscribe();
    this.closed = true;
  }

  get next$(): Observable<any> {
    return this._next$;
  }

  get error$(): Observable<any> {
    return this._error$;
  }

  get complete$(): Observable<void> {
    return this._complete$;
  }
}
