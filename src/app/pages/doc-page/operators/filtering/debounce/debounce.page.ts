import {DocPage} from "../../../doc-page.model";
import {DebounceDetailsComponent} from "./debounce-details/debounce-details.component";

export const debouncePage: DocPage = {
  title: 'debounce',
  routeUrl: 'operators/debounce',
  detailsComponent: DebounceDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/debounce',
  sampleCode: `import {concat, of, delay, debounce, timer} from "rxjs";
import {observe, createValue} from "vizual-rx";

const source$ = concat(
    of(createValue('blue', 'circle')),
    of(createValue('red', 'circle'))
        .pipe(delay(500)),
    of(createValue('blue', 'circle'))
        .pipe(delay(500)),
    of(createValue('red', 'circle'))
        .pipe(delay(2000)),
    of(createValue('blue', 'circle'))
        .pipe(delay(1200)),
    of(createValue('red', 'circle'))
        .pipe(delay(500)),
    of(createValue('blue', 'circle'))
        .pipe(delay(1200))
);

const example$ = source$
    .pipe(
        debounce(value => timer(500 + (value.color === 'red' ? 500 : 0) ))
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
