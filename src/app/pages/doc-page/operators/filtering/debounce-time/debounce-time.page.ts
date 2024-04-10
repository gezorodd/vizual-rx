import {DocPage} from "../../../doc-page.model";
import {DebounceTimeDetailsComponent} from "./debounce-time-details/debounce-time-details.component";

export const debounceTimePage: DocPage = {
  title: 'debounceTime',
  routeUrl: 'operators/debounce-time',
  detailsComponent: DebounceTimeDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/debounceTime',
  starred: true,
  sampleCode: `import {concat, of, delay, debounceTime} from "rxjs";
import {observe, createValue} from "vizual-rx";

const source$ = concat(
    of(createValue('blue', 'circle')),
    of(createValue('red', 'circle'))
        .pipe(delay(500)),
    of(createValue('green', 'circle'))
        .pipe(delay(500)),
    of(createValue('orange', 'circle'))
        .pipe(delay(2000)),
    of(createValue('yellow', 'circle'))
        .pipe(delay(1200)),
    of(createValue('purple', 'circle'))
        .pipe(delay(500)),
    of(createValue('cyan', 'circle'))
        .pipe(delay(1200))
);

const example$ = source$
    .pipe(
        debounceTime(800)
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
