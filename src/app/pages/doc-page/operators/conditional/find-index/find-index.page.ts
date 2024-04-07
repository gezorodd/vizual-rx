import {DocPage} from "../../../doc-page.model";
import {FindIndexDetailsComponent} from "./find-index-details/find-index-details.component";

export const findIndexPage: DocPage = {
  title: 'findIndex',
  routeUrl: 'operators/find-index',
  detailsComponent: FindIndexDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/findIndex',
  sampleCode: `import { timer, map, take, findIndex } from 'rxjs';
import { observe, createValue, colorAt } from 'vizual-rx';

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i % 3), 'circle')),
        take(8)
    );

const example$ = source$
    .pipe(
        findIndex(v => v.color === 'green')
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
