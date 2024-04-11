import {DocPage} from "../../../doc-page.model";
import {TimeoutWithDetailsComponent} from "./timeout-with-details/timeout-with-details.component";

export const timeoutWithPage: DocPage = {
  title: 'timeoutWith',
  routeUrl: 'operators/timeout-with',
  detailsComponent: TimeoutWithDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/timeoutWith',
  deprecated: true,
  sampleCode: `import { of, delay, timeoutWith} from 'rxjs';
import { observe, createValue } from 'vizual-rx';

const source$ = of(createValue('red', 'circle'))
    .pipe(
        delay(2000)
    );

const example$ = source$
    .pipe(
        timeoutWith(1000, of(createValue('circle', 'green')))
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
