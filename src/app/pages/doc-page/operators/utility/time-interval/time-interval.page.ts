import {DocPage} from "../../../doc-page.model";
import {TimeIntervalDetailsComponent} from "./time-interval-details/time-interval-details.component";

export const timeIntervalPage: DocPage = {
  title: 'timeInterval',
  routeUrl: 'operators/time-interval',
  detailsComponent: TimeIntervalDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/timeInterval',
  sampleCode: `import { timer, map, take, timeInterval} from 'rxjs';
import { observe, createValue, colorAt } from 'vizual-rx';

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(5)
    );

const example$ = source$
    .pipe(
        timeInterval(),
        map(v => Math.floor(v.interval))
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
