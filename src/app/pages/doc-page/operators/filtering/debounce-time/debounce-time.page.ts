import {DocPage} from "../../../doc-page.model";
import {DebounceTimeDetailsComponent} from "./debounce-time-details/debounce-time-details.component";

export const debounceTimePage: DocPage = {
  title: 'debounceTime',
  routeUrl: 'operators/debounce-time',
  detailsComponent: DebounceTimeDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/debounceTime',
  starred: true,
  sampleCode: `import {debounceTime, fromEvent, map, tap, take} from "rxjs";
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
    .subscribe(observe('example'));`
};
