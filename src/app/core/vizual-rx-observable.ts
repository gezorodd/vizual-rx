import {catchError, every, filter, map, Observable, of} from "rxjs";

export class VizualRxObservable {
  readonly label: string;
  readonly observable$: Observable<any>;
  readonly completed$: Observable<void>;
  readonly errored$: Observable<void>;

  constructor(label: string, observable: Observable<any>) {
    this.label = label;
    this.observable$ = observable;
    this.completed$ = this.observable$
      .pipe(
        every(() => true),
        map(() => undefined)
      );
    this.errored$ = this.completed$
      .pipe(
        map(() => false),
        catchError(() => of(true)),
        filter(v => v),
        map(() => undefined)
      );
  }
}
