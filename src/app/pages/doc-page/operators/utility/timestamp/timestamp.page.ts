import {DocPage} from "../../../doc-page.model";
import {TimestampDetailsComponent} from "./timestamp-details/timestamp-details.component";

export const timestampPage: DocPage = {
  title: 'timestamp',
  routeUrl: 'operators/timestamp',
  detailsComponent: TimestampDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/timestamp',
  sampleCode: `import { timer, map, take, timestamp} from 'rxjs';
import { observe, createValue, colorAt } from 'vizual-rx';

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(5)
    );

const example$ = source$
    .pipe(
        timestamp(),
        map(v => v.timestamp)
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
