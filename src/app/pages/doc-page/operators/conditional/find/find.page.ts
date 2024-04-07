import {DocPage} from "../../../doc-page.model";
import {FindDetailsComponent} from "./find-details/find-details.component";

export const findPage: DocPage = {
  title: 'find',
  routeUrl: 'operators/find',
  detailsComponent: FindDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/find',
  sampleCode: `import { timer, map, take, find } from 'rxjs';
import { observe, createValue, colorAt } from 'vizual-rx';

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i % 3), 'circle')),
        take(8)
    );

const example$ = source$
    .pipe(
        find(v => v.color === 'green')
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
