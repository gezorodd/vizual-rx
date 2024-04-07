import {DocPage} from "../../../doc-page.model";
import {RetryDetailsComponent} from "./retry-details/retry-details.component";

export const retryPage: DocPage = {
  title: 'retry',
  routeUrl: 'operators/retry',
  detailsComponent: RetryDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/retry',
  sampleCode: `import { interval, map, tap, retry } from 'rxjs';
import { observe, createValue, colorAt } from 'vizual-rx'

const source$ = interval(500)
    .pipe(
        map(i => {
            if (i >= 3) {
                throw colorAt(i);
            } else {
                return createValue(colorAt(i), 'circle');
            }
        }),
        tap(observe('source'))
    );

const example$ = source$
    .pipe(
        retry(2)
    );
example$
    .subscribe(observe('example'));`
};
