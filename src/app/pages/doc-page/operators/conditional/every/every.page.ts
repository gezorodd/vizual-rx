import {DocPage} from "../../../doc-page.model";
import {EveryDetailsComponent} from "./every-details/every-details.component";

export const everyPage: DocPage = {
  title: 'every',
  routeUrl: 'operators/every',
  detailsComponent: EveryDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/every',
  sampleCode: `import { timer, map, take, every } from 'rxjs';
import { observe, createValue } from 'vizual-rx';

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(i >= 3 ? 'red' : 'blue', 'circle')),
        take(5)
    );

const example$ = source$
    .pipe(
        every(v => v.color === 'blue')
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
