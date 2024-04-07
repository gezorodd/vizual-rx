import {DocPage} from "../../../doc-page.model";
import {CountDetailsComponent} from "./count-details/count-details.component";

export const countPage: DocPage = {
  title: 'count',
  routeUrl: 'operators/count',
  detailsComponent: CountDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/count',
  sampleCode: `import { timer, map, take, count } from 'rxjs';
import { observe, createValue, colorAt } from 'vizual-rx';

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i % 2), 'circle')),
        take(5)
    );

const example$ = source$
    .pipe(
        count(v => v.color === 'blue')
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
