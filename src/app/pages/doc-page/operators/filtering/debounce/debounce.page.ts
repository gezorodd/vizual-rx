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
    of(0),
    of(1)
        .pipe(delay(500)),
    of(2)
        .pipe(delay(500)),
    of(3)
        .pipe(delay(2000)),
    of(4)
        .pipe(delay(1200)),
    of(5)
        .pipe(delay(500)),
    of(6)
        .pipe(delay(1200))
);

const example$ = source$
    .pipe(
        debounce(i => timer(500 + (i % 2) * 500 ))
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
