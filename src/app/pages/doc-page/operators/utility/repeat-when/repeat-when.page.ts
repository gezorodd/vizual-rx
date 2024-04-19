import {DocPage} from "../../../doc-page.model";
import {RepeatWhenDetailsComponent} from "./repeat-when-details/repeat-when-details.component";

export const repeatWhenPage: DocPage = {
  title: 'repeatWhen',
  routeUrl: 'operators/repeat-when',
  detailsComponent: RepeatWhenDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/repeatWhen',
  deprecated: true,
  sampleCode: `import { timer, map, take, repeatWhen } from 'rxjs';
import { observe, createValue, colorAt } from 'vizual-rx';

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(4)
    );

const example$ = source$
    .pipe(
        repeatWhen(() => timer(2000))
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
