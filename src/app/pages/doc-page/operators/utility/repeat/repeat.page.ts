import {DocPage} from "../../../doc-page.model";
import {RepeatDetailsComponent} from "./repeat-details/repeat-details.component";

export const repeatPage: DocPage = {
  title: 'repeat',
  routeUrl: 'operators/repeat',
  detailsComponent: RepeatDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/repeat',
  sampleCode: `import { timer, map, take, repeat } from 'rxjs';
import { observe, createValue, colorAt } from 'vizual-rx';

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(4)
    );

const example$ = source$
    .pipe(
        repeat(3)
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
