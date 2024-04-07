import {DocPage} from "../../../doc-page.model";
import {CatchErrorDetailsComponent} from "./catch-error-details/catch-error-details.component";

export const catchErrorPage: DocPage = {
  title: 'catchError',
  routeUrl: 'operators/catch-error',
  detailsComponent: CatchErrorDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/catchError',
  sampleCode: `import { timer, map, catchError, take } from 'rxjs';
import { observe, createValue, colorAt, shapeAt } from 'vizual-rx'

const source$ = timer(0, 500)
    .pipe(
        map(i => {
            if (i >= 4) {
                throw colorAt(i);
            } else {
                return createValue(colorAt(i), 'circle');
            }
        })
    );
source$
    .subscribe(observe('source'));

const example$ = source$
    .pipe(
        catchError(errorColor =>
            timer(0, 500)
                .pipe(
                    map(j => createValue(errorColor, shapeAt(j))),
                    take(3)
                )
        )
    );
example$
    .subscribe(observe('example'));`
};
