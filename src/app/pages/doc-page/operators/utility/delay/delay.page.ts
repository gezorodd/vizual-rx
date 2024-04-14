import {DocPage} from "../../../doc-page.model";
import {DelayDetailsComponent} from "./delay-details/delay-details.component";

export const delayPage: DocPage = {
  title: 'delay',
  routeUrl: 'operators/delay',
  detailsComponent: DelayDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/delay',
  starred: true,
  sampleCode: `import { timer, map, take, delay } from 'rxjs';
import { observe, createValue, colorAt } from 'vizual-rx';

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(5)
    );

const example$ = source$
    .pipe(
        delay(1000)
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
