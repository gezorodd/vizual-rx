import {DocPage} from "../../../doc-page.model";
import {RetryWhenDetailsComponent} from "./retry-when-details/retry-when-details.component";

export const retryWhenPage: DocPage = {
  title: 'retryWhen',
  routeUrl: 'operators/retry-when',
  detailsComponent: RetryWhenDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/retryWhen',
  deprecated: true,
  sampleCode: `import { interval, timer, map, tap, retryWhen, take } from 'rxjs';
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

const notifier$ = timer(1000, 2500)
    .pipe(
        map(() => createValue('purple', 'circle')),
        take(3),
        tap(observe('notifier'))
    )

const example$ = source$
    .pipe(
        retryWhen(() => notifier$)
    );
example$
    .subscribe(observe('example'));`
};
