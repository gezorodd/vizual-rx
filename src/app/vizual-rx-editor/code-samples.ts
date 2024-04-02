export class CodeSample {
  readonly label: string;
  readonly code: string;
  readonly category: CodeCategory;

  constructor(category: CodeCategory, label: string, code: string) {
    this.category = category;
    this.label = label;
    this.code = code;
  }
}

export enum CodeCategory {
  COMBINATION = 'Combination',
  CONDITIONAL = 'Conditional',
  CREATION = 'Creation',
  ERROR_HANDLING = 'Error Handling',
  FILTERING = 'Filtering',
  TRANSFORMATION = 'Transformation',
}

export const codeSamples: CodeSample[] = [

  new CodeSample(CodeCategory.COMBINATION, 'combineAll',
    `import {combineAll, timer, map, take, tap} from "rxjs";
import {createValue, observe, colorAt, shapeAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        take(2),
        tap(observe("source"))
    );

const example$ = source$
    .pipe(
        map((val) =>
            timer(val * 1000, 2000)
                .pipe(
                    map(i => createValue(colorAt(val), shapeAt(i))),
                    take(3 + (val * 2)),
                    tap(observe("observable  " + val))
                )
        ),
        combineAll()
    );

example$
    .subscribe(observe('example'));`),

  new CodeSample(CodeCategory.COMBINATION, 'combineLatest',
    `import {combineLatest, timer, map, take, tap} from "rxjs";
import {createValue, observe, shapeAt} from "vizual-rx";

const source1$ = timer(0, 2000)
    .pipe(
        map(i => createValue('red', shapeAt(i))),
        take(3),
        tap(observe('source1'))
    );

const source2$ = timer(1000, 2000)
    .pipe(
        map(i => createValue('blue', shapeAt(i))),
        take(5),
        tap(observe('source2'))
    );

const example$ = combineLatest([source1$, source2$]);

example$
    .subscribe(observe('example'));`),

  new CodeSample(CodeCategory.COMBINATION, 'concat',
    `import {concat, interval, map, take, tap} from "rxjs";
import {createValue, observe} from "vizual-rx";

const source1$ = interval(500)
    .pipe(
        map(() => createValue('red')),
        take(3),
        tap(observe('source1'))
    );

const source2$ = interval(500)
    .pipe(
        map(() => createValue('blue')),
        take(2),
        tap(observe('source2'))
    );

const source3$ = interval(500)
    .pipe(
        map(() => createValue('green')),
        take(1),
        tap(observe('source3'))
    );

const example$ = concat(source1$, source2$, source3$);

example$
    .subscribe(observe('example'));`),

  new CodeSample(CodeCategory.COMBINATION, 'concatAll',
    `import {concatAll, interval, map, take, tap} from "rxjs";
import {createValue, observe, colorAt} from "vizual-rx";

const source$ = interval(500)
    .pipe(
        take(3),
        tap(observe('source'))
    );

const example$ = source$
    .pipe(
        map(val =>
            interval(500)
                .pipe(
                    map(() => createValue(colorAt(val))),
                    take(2),
                    tap(observe('observable ' + val))
                )
        ),
        concatAll()
    );

example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.COMBINATION, 'endWidth',
    `import {endWith, interval, take, tap, mapTo} from "rxjs";
import {createValue, observe} from "vizual-rx";

const source$ = interval(1000)
    .pipe(
        mapTo(createValue('red', 'square')),
        take(3),
        tap(observe("source"))
    );

const example$ = source$
    .pipe(
        endWith(createValue('yellow', 'triangle'))
    );

example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.COMBINATION, 'forkJoin',
    `import {map, interval, take, tap, forkJoin} from "rxjs";
import {createValue, observe} from "vizual-rx";

const source1$ = interval(500)
    .pipe(
        map(() => createValue('red')),
        take(4),
        tap(observe("source1"))
    );

const source2$ = interval(1000)
    .pipe(
        map(() => createValue('blue')),
        take(4),
        tap(observe("source2"))
    );

const example$ = forkJoin(source1$, source2$);

example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.COMBINATION, 'merge',
    `import {map, timer, take, tap, delay, merge} from "rxjs";
import {createValue, observe} from "vizual-rx";

const source1$ = timer(0, 1000)
    .pipe(
        map(() => createValue('red')),
        take(3),
        tap(observe("source1"))
    );

const source2$ = timer(0, 1000)
    .pipe(
        delay(1500),
        map(() => createValue('blue')),
        take(5),
        tap(observe("source2"))
    );

const example$ = merge(source1$, source2$);

example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.COMBINATION, 'mergeAll',
    `import {mergeAll, timer, map, take, tap} from "rxjs";
import {createValue, observe, colorAt, shapeAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        take(2),
        tap(observe("source"))
    );

const example$ = source$
    .pipe(
        map((val) =>
            timer(0, 1000)
                .pipe(
                    map(i => createValue(colorAt(val), shapeAt(i))),
                    take(3 + (val * 2)),
                    tap(observe("observable  " + val))
                )
        ),
        mergeAll()
    );

example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.COMBINATION, 'pairwise',
    `import {pairwise, timer, map, take, tap} from "rxjs";
import {createValue, observe, shapeAt} from "vizual-rx";

const source$ = timer(0, 1000)
    .pipe(
        map(i => createValue('red', shapeAt(i))),
        take(5),
        tap(observe("source"))
    );

const example$ = source$
    .pipe(
        pairwise()
    );

example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.COMBINATION, 'race',
    `import {race, interval, map, take, delay} from "rxjs";
import {createValue, observe, shapeAt} from "vizual-rx";

const source1$ = interval(1000)
    .pipe(
        take(3),
        map(i => createValue('red', shapeAt(i)))
    );

const source2$ = interval(800)
    .pipe(
        take(4),
        map(i => createValue('blue', shapeAt(i)))
    );

const source3$ = interval(500)
    .pipe(
        delay(1000),
        take(3),
        map(i => createValue('green', shapeAt(i)))
    );

const example$ = race(source1$, source2$, source3$);

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));
source3$
    .subscribe(observe('source 3'));
example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.COMBINATION, 'startWith',
    `import {startWith, interval, take, tap, mapTo} from "rxjs";
import {createValue, observe} from "vizual-rx";

const source$ = interval(1000)
    .pipe(
        mapTo(createValue('red', 'square')),
        take(3),
        tap(observe("source"))
    );

const example$ = source$
    .pipe(
        startWith(createValue('blue', 'circle'))
    );

example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.COMBINATION, 'withLatestFrom',
    `import {withLatestFrom, interval, map, take, tap} from "rxjs";
import {createValue, observe, shapeAt} from "vizual-rx";

const source1$ = interval(2000)
    .pipe(
        take(3),
        map(i => createValue('red', shapeAt(i))),
        tap(observe("source 1"))
    );

const source2$ = interval(500)
    .pipe(
        map(i => createValue('blue', shapeAt(i))),
        tap(observe("source 2"))
    );

const example$ = source1$
    .pipe(
        withLatestFrom(source2$)
    );

example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.COMBINATION, 'zip',
    `import {zip, interval, map, take, tap, delay} from "rxjs";
import {createValue, observe, shapeAt} from "vizual-rx";

const source1$ = interval(2000)
    .pipe(
        take(3),
        map(i => createValue('red', shapeAt(i))),
        tap(observe("source 1"))
    );

const source2$ = interval(500)
    .pipe(
        map(i => createValue('blue', shapeAt(i + 1))),
        tap(observe("source 2"))
    );

const source3$ = interval(2000)
    .pipe(
        delay(1000),
        map(i => createValue('green', shapeAt(i + 2))),
        tap(observe("source 3"))
    );

const example$ = zip(source1$, source2$, source3$);

example$
    .subscribe(observe('example'));`),

  new CodeSample(CodeCategory.CONDITIONAL, 'defaultIfEmpty',
    `import {defaultIfEmpty, of, tap} from "rxjs";
import {createValue, observe} from "vizual-rx";

const source1$ = of()
    .pipe(
        tap(observe('source 1'))
    );

const source2$ = of(createValue('red', 'circle'))
    .pipe(
        tap(observe('source 2'))
    );

const example1$ = source1$
    .pipe(
        defaultIfEmpty(createValue('yellow', 'triangle'))
    );
example1$
    .subscribe(observe('source 1 or yellow triangle'));

const example2$ = source2$
    .pipe(
        defaultIfEmpty(createValue('yellow', 'triangle'))
    );
example2$
    .subscribe(observe('source 2 or yellow triangle'));`),

  new CodeSample(CodeCategory.CONDITIONAL, 'every',
    `import {every, interval, take, map, tap} from "rxjs";
import {createValue, observe, shapeAt, colorAt} from "vizual-rx";

const source1$ = interval(500)
    .pipe(
        take(5),
        map(i => createValue('blue', shapeAt(i))),
        tap(observe("source 1"))
    );

const source2$ = interval(500)
    .pipe(
        map(i => createValue(colorAt(Math.max(i + 3, 8)), shapeAt(i))),
        tap(observe("source 2"))
    );

const example1$ = source1$
    .pipe(
        every(value => value.color === 'blue')
    );
example1$
    .subscribe(observe('every source 1 is blue'));

const example2$ = source2$
    .pipe(
        every(value => value.color === 'red')
    );
example2$
    .subscribe(observe('every source 2 is red'));`),

  new CodeSample(CodeCategory.CONDITIONAL, 'iif',
    `import {interval, take, tap, of, mergeMap, iif} from "rxjs";
import {createValue, observe} from "vizual-rx";

const source1$ = interval(500)
    .pipe(
        take(10),
        tap(observe("source 1"))
    );

const source2$ = of(createValue('blue', 'circle'));
const source3$ = of(createValue('red', 'circle'));

const example1$ = source1$
    .pipe(
        mergeMap(i =>
            iif(() => i % 2, source2$, source3$)
        )
    );
example1$
    .subscribe(observe('example'));`),

  new CodeSample(CodeCategory.CONDITIONAL, 'sequenceEqual',
    `import {zip, interval, map, tap, from, of, switchMap, sequenceEqual} from "rxjs";
import {createValue, observe} from "vizual-rx";

const expectedSequence$ = of(
    createValue('blue', 'circle'),
    createValue('red', 'circle'),
    createValue('green', 'circle')
);

const source$ = zip(
    interval(1000),
    of(
        [
            createValue('blue', 'square'),
            createValue('red', 'circle'),
            createValue('green', 'circle')
        ],
        [
            createValue('yellow', 'circle'),
            createValue('green', 'square'),
            createValue('blue', 'square')
        ],
        [
            createValue('blue', 'circle'),
            createValue('red', 'circle'),
            createValue('green', 'circle')
        ],
        [
            createValue('blue', 'square'),
            createValue('blue', 'circle'),
            createValue('red', 'circle')
        ]
    )
).pipe(
    map(([_, value]) => value),
    tap(observe('source'))
);

const example$ = source$
    .pipe(
        switchMap(array =>
            from(array)
                .pipe(
                    sequenceEqual(expectedSequence$, (v1, v2) => v1.equals(v2))
                )
        ),
    )

example$
  .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.CREATION, 'ajax',
    `import {ajax} from "rxjs/ajax";
import {map} from "rxjs";
import {observe} from "vizual-rx";

const example$ = ajax('https://api.github.com/users?per_page=5')
    .pipe(
        map(ajaxResponse => ajaxResponse.response),
        map(response => response[0].login)
    );

example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.CREATION, 'create',
    `import { Observable, zip, interval, map } from 'rxjs';
import {observe, createValue} from "vizual-rx";

const observable$ = Observable.create(observer => {
    observer.next(createValue('red', 'circle'));
    observer.next(createValue('blue', 'square'));
    observer.next(createValue('green', 'triangle'));
    observer.complete();
});

const example$ = zip([
    interval(500),
    observable$
]).pipe(
    map(([_, value]) => value)
);

example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.CREATION, 'defer',
    `import { Observable, interval, take, defer, of, mergeMap } from 'rxjs';
import {observe } from "vizual-rx";

const source$ = defer(() => of(new Date().getMilliseconds()));

const example$ = interval(500)
    .pipe(
        mergeMap(() => source$),
        take(5)
    );

example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.CREATION, 'empty',
    `import {empty} from "rxjs";
import {observe} from "vizual-rx";

const example$ = empty();
example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.CREATION, 'from',
    `import {from, zip, map, interval} from "rxjs";
import {observe, createValue} from "vizual-rx";

const source1$ = from([
    createValue('red', 'circle'),
    createValue('blue', 'circle'),
    createValue('green', 'circle')
]);
const example1$ = zip(interval(500), source1$)
    .pipe(
        map(([_, value]) => value)
    );
example1$
    .subscribe(observe('from array'));

const example2$ = from(
    new Promise(resolve => resolve(createValue('blue', 'square')))
);
example2$
    .subscribe(observe('from Promise'));

const example3$ = zip(interval(500), from('Hello'))
    .pipe(
        map(([_, value]) => value)
    );
example3$
    .subscribe(observe('from string'));`),


  new CodeSample(CodeCategory.CREATION, 'fromEvent',
    `import {fromEvent, mapTo} from 'rxjs';
import {observe, createValue} from "vizual-rx";

const example$ = fromEvent(document, 'click')
    .pipe(
        mapTo(createValue('blue', 'circle'))
    );
example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.CREATION, 'generate',
    `import {generate, zip, map, interval} from "rxjs";
import {observe} from "vizual-rx";

const source$ = generate(
    45,
    n => n != 1,
    n => {
        if (n % 2 == 0) {
            return n / 2;
        } else {
            return n * 3 + 1;
        }
    }
);

const example$ = zip(interval(500), source$)
    .pipe(
        map(([_, value]) => value)
    );
example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.CREATION, 'interval',
    `import {interval, take} from "rxjs";
import {observe} from "vizual-rx";

const example$ = interval(500)
    .pipe(
        take(5)
    );
example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.CREATION, 'of',
    `import {of, zip, map, interval} from "rxjs";
import {observe, createValue} from "vizual-rx";

const source$ = of(
    createValue('red', 'circle'),
    createValue('blue', 'circle'),
    createValue('green', 'circle')
);

const example$ = zip(interval(500), source$)
    .pipe(
        map(([_, value]) => value)
    );
example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.CREATION, 'range',
    `import {range, zip, map, interval} from "rxjs";
import {observe} from "vizual-rx";

const source$ = range(5, 4);

const example$ = zip(interval(500), source$)
    .pipe(
        map(([_, value]) => value)
    );
example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.CREATION, 'throwError',
    `import {throwError} from "rxjs";
import {observe} from "vizual-rx";

const example$ = throwError('Oops, something wrong happened');
example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.CREATION, 'timer',
    `import {timer, mapTo, take} from "rxjs";
import {observe, createValue} from "vizual-rx";

const example1$ = timer(1000)
    .pipe(
        mapTo(createValue('blue', 'circle'))
    );
example1$
    .subscribe(observe('example 1'));

const example2$ = timer(1000, 500)
    .pipe(
        mapTo(createValue('red', 'circle')),
        take(5)
    );
example2$
    .subscribe(observe('example 2'));`),


  new CodeSample(CodeCategory.ERROR_HANDLING, 'catchError',
    `import {interval, mergeMap, of, throwError, catchError, tap} from "rxjs";
import {observe, createValue, shapeAt} from "vizual-rx";

const source$ = interval(500)
    .pipe(
        mergeMap(i => {
            const shape = shapeAt(i);
            if (i === 3) {
                return throwError(shape);
            }
            return of(createValue('blue', shape));
        }),
        tap(observe('source'))
    );

const example$ = source$
    .pipe(
        catchError(shape => {
            return of(createValue('green', shape));
        })
    );
example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.ERROR_HANDLING, 'retry',
    `import {interval, mergeMap, of, throwError, retry, tap} from "rxjs";
import {observe, createValue, shapeAt} from "vizual-rx";

const source$ = interval(500)
    .pipe(
        mergeMap(i => {
            if (i === 3) {
                return throwError('this is an error');
            }
            return of(createValue('blue', shapeAt(i)));
        }),
        tap(observe('source'))
    );

const example$ = source$
    .pipe(
        retry(2)
    );
example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.ERROR_HANDLING, 'retryWhen',
    `import {interval, mergeMap, of, throwError, retryWhen, tap, delay} from "rxjs";
import {observe, createValue, shapeAt} from "vizual-rx";

const source$ = interval(500)
    .pipe(
        mergeMap(i => {
            if (i === 3) {
                return throwError(createValue('red', 'circle'));
            }
            return of(createValue('blue', shapeAt(i)));
        }),
        tap(observe('source'))
    );

const example$ = source$
    .pipe(
        retryWhen(errors$ =>
            errors$
                .pipe(
                    tap(observe('errors')),
                    delay(1500)
                )
        )
    );
example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.FILTERING, 'audit',
    `import {audit, interval, take, tap, timer} from "rxjs";
import {observe} from "vizual-rx";

const source$ = interval(500)
    .pipe(
        take(10),
        tap(observe('source'))
    );

const example$ = source$
    .pipe(
        audit(value => {
            return timer((value + 1) * 250);
        })
    )
example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.FILTERING, 'auditTime',
    `import {auditTime, interval, map, take, tap} from "rxjs";
import {observe, createValue, shapeAt} from "vizual-rx";

const source$ = interval(500)
    .pipe(
        map(i => createValue('blue', shapeAt(i))),
        take(10),
        tap(observe('source'))
    );

const example$ = source$
    .pipe(
        auditTime(1000)
    )
example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.FILTERING, 'debounce',
    `import {debounce, fromEvent, map, timer, tap, take} from "rxjs";
import {observe} from "vizual-rx";

let i = 0;
const source$ = fromEvent(document, 'click')
    .pipe(
        map(() => i++),
        take(20),
        tap(observe('source'))
    );

const example$ = source$
    .pipe(
        debounce(i => timer(i * 100))
    );
example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.FILTERING, 'debounceTime',
    `import {debounceTime, fromEvent, map, tap, take} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

let i = 0;
const source$ = fromEvent(document, 'click')
    .pipe(
        map(() => createValue('circle', colorAt(i++))),
        take(20),
        tap(observe('source'))
    );

const example$ = source$
    .pipe(
        debounceTime(1000)
    );
example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.FILTERING, 'distinct',
    `import {distinct, interval, map, tap, zip, of} from "rxjs";
import {observe, createValue} from "vizual-rx";

const source$ = zip(
    interval(500),
    of(
        createValue('blue', 'circle'),
        createValue('red', 'circle'),
        createValue('red', 'circle'),
        createValue('blue', 'circle'),
        createValue('green', 'circle'),
        createValue('orange', 'circle'),
        createValue('orange', 'circle'),
        createValue('blue', 'circle'),
        createValue('yellow', 'circle'),
        createValue('purple', 'circle'),
        createValue('purple', 'circle'),
        createValue('purple', 'circle'),
        createValue('red', 'circle')
    )
).pipe(
    map(([_, value]) => value),
    tap(observe('source'))
);

const example$ = source$
    .pipe(
        distinct(value => value.color)
    );
example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.FILTERING, 'distinctUntilChanged',
    `import {distinctUntilChanged, interval, map, tap, zip, of} from "rxjs";
import {observe, createValue} from "vizual-rx";

const source$ = zip(
    interval(500),
    of(
        createValue('blue', 'circle'),
        createValue('red', 'circle'),
        createValue('red', 'circle'),
        createValue('blue', 'circle'),
        createValue('green', 'circle'),
        createValue('orange', 'circle'),
        createValue('orange', 'circle'),
        createValue('blue', 'circle'),
        createValue('yellow', 'circle'),
        createValue('purple', 'circle'),
        createValue('purple', 'circle'),
        createValue('purple', 'circle'),
        createValue('red', 'circle')
    )
).pipe(
    map(([_, value]) => value),
    tap(observe('source'))
);

const example$ = source$
    .pipe(
        distinctUntilChanged((v1, v2) => v1.equals(v2))
    );
example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.FILTERING, 'distinctUntilKeyChanged',
    `import {distinctUntilKeyChanged, interval, map, tap, zip, of} from "rxjs";
import {observe, createValue} from "vizual-rx";

const source$ = zip(
    interval(500),
    of(
        createValue('blue', 'circle'),
        createValue('red', 'circle'),
        createValue('red', 'circle'),
        createValue('blue', 'circle'),
        createValue('green', 'circle'),
        createValue('orange', 'circle'),
        createValue('orange', 'circle'),
        createValue('blue', 'circle'),
        createValue('yellow', 'circle'),
        createValue('purple', 'circle'),
        createValue('purple', 'circle'),
        createValue('purple', 'circle'),
        createValue('red', 'circle')
    )
).pipe(
    map(([_, value]) => value),
    tap(observe('source'))
);

const example$ = source$
    .pipe(
        distinctUntilKeyChanged('color')
    );
example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.FILTERING, 'filter',
    `import {filter, interval, map, take, tap} from "rxjs";
import {observe, createValue, shapeAt, colorAt} from "vizual-rx";

const source$ = interval(500)
    .pipe(
        map(i => createValue(colorAt(i), shapeAt(i))),
        take(15),
        tap(observe('source'))
    );

const example$ = source$
    .pipe(
        filter(value => value.shape === 'square')
    );
example$
    .subscribe(observe('example'));`),


  new CodeSample(CodeCategory.FILTERING, 'find',
    `import {find, interval, map, take, tap} from "rxjs";
import {observe, createValue, shapeAt, colorAt} from "vizual-rx";

const source$ = interval(500)
    .pipe(
        map(i => createValue(colorAt(i), shapeAt(i))),
        take(15),
        tap(observe('source'))
    );

const example1$ = source$
    .pipe(
        find(value => value.color === 'green' && value.shape === 'circle')
    );
example1$
    .subscribe(observe('find green circle'));

const example2$ = source$
    .pipe(
        find(value => value.color === 'red' && value.shape === 'square')
    );
example2$
    .subscribe(observe('find red square'));`),


  new CodeSample(CodeCategory.FILTERING, 'first',
    `import {first, interval, map, take, tap} from "rxjs";
import {observe, createValue, shapeAt, colorAt} from "vizual-rx";

const source$ = interval(500)
  .pipe(
    map(i => createValue(colorAt(i), shapeAt(i))),
    take(10),
    tap(observe('source'))
  );

const example1$ = source$
  .pipe(
    first()
  );
example1$
  .subscribe(observe('first'));

const example2$ = source$
  .pipe(
    first(value => value.shape === 'triangle')
  );
example2$
  .subscribe(observe('first triangle'));

const example3$ = source$
  .pipe(
    first(value => value.color === 'red' && value.shape === 'square')
  );
example3$
  .subscribe(observe('first red square'));`),


  new CodeSample(CodeCategory.FILTERING, 'ignoreElements',
    `import {ignoreElements, interval, map, take, tap, mergeMap, throwError, of} from "rxjs";
import {observe, createValue, shapeAt} from "vizual-rx";

const source1$ = interval(500)
  .pipe(
    map(i => createValue('blue', shapeAt(i))),
    take(10),
    tap(observe('source 1'))
  );
const example1$ = source1$
  .pipe(
    ignoreElements()
  );
example1$
  .subscribe(observe('example 1'));

const source2$ = interval(500)
  .pipe(
    mergeMap(i => {
      if (i > 3) {
        return throwError();
      } else {
        return of(createValue('blue', shapeAt(i)));
      }
    }),
    tap(observe('source 2'))
  )
const example2$ = source2$
  .pipe(
    ignoreElements()
  );
example2$
  .subscribe(observe('example 2'));`),


  new CodeSample(CodeCategory.FILTERING, 'last',
    `import {last, interval, map, take, tap} from "rxjs";
import {observe, createValue, shapeAt, colorAt} from "vizual-rx";

const source$ = interval(500)
  .pipe(
    map(i => createValue(colorAt(i), shapeAt(i))),
    take(10),
    tap(observe('source'))
  );

const example1$ = source$
  .pipe(
    last()
  );
example1$
  .subscribe(observe('last'));

const example2$ = source$
  .pipe(
    last(value => value.shape === 'diamond')
  );
example2$
  .subscribe(observe('last diamond'));

const example3$ = source$
  .pipe(
    last(value => value.color === 'red' && value.shape === 'square')
  );
example3$
  .subscribe(observe('last red square'));`),


  new CodeSample(CodeCategory.TRANSFORMATION, 'mergeMap',
    `import {map, interval, take, tap, delay, mergeMap} from "rxjs";
import {createValue, observe, colorAt, shapeAt} from "vizual-rx";

const source$ = interval(500)
  .pipe(
    take(3),
    tap(observe("source"))
  );

const example$ = source$
  .pipe(
    mergeMap(val =>
      interval(1500)
        .pipe(
          delay(500 * val),
          map(i => createValue(colorAt(val), shapeAt(i))),
          take(5),
          tap(observe('observable ' + val))
        )
    )
  );

example$
  .subscribe(observe('example'));`),
];

