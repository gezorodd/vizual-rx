import {DocPage} from "../../../doc-page.model";
import {TakeLastDetailsComponent} from "./take-last-details/take-last-details.component";

export const takeLastPage: DocPage = {
  title: 'takeLast',
  routeUrl: 'operators/take-last',
  detailsComponent: TakeLastDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/takeLast',
  sampleCode: `import {takeLast, timer, map, take} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(8)
    );

const example$ = source$
    .pipe(
        takeLast(3)
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
