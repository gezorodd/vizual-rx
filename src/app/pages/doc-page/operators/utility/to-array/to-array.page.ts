import {DocPage} from "../../../doc-page.model";
import {ToArrayDetailsComponent} from "./to-array-details/to-array-details.component";

export const toArrayPage: DocPage = {
  title: 'toArray',
  routeUrl: 'operators/to-array',
  detailsComponent: ToArrayDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/toArray',
  sampleCode: `import { timer, map, take, toArray } from 'rxjs';
import { observe, createValue, colorAt } from 'vizual-rx';

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(5)
    );

const example$ = source$
    .pipe(
        toArray()
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
