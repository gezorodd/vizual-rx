import {DocPage} from "../../../doc-page.model";
import {DelayWhenDetailsComponent} from "./delay-when-details/delay-when-details.component";

export const delayWhenPage: DocPage = {
  title: 'delayWhen',
  routeUrl: 'operators/delay-when',
  detailsComponent: DelayWhenDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/delayWhen',
  sampleCode: `import { timer, map, take, delayWhen } from 'rxjs';
import { observe, createValue, colorAt } from 'vizual-rx';

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(5)
    );

const example$ = source$
    .pipe(
        delayWhen((_, i) => timer(i * 500))
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
