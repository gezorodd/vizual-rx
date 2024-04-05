import {DocPage} from "../../../doc-page.model";
import {DebounceDetailsComponent} from "./debounce-details/debounce-details.component";

export const debouncePage: DocPage = {
  title: 'debounce',
  routeUrl: 'operators/debounce',
  detailsComponent: DebounceDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/debounce',
  sampleCode: `import {debounce, fromEvent, map, timer, tap, take} from "rxjs";
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
        debounce(i => timer((20 - i) * 100))
    );
example$
    .subscribe(observe('example'));`
};
