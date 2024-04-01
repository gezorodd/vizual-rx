import {Page} from "../../../vizual-rx-page.model";
import {IgnoreElementsDetailsComponent} from "./ignore-elements-details/ignore-elements-details.component";

export const ignoreElementsPage: Page = {
  title: 'ignoreElements',
  routeUrl: 'operators/ignore-elements',
  detailsComponent: IgnoreElementsDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/ignoreElements',
  sampleCode: `import {ignoreElements, interval, map, take, tap, mergeMap, throwError, of} from "rxjs";
import {observe, createValue} from "vizual-rx";

const source1$ = interval(500)
  .pipe(
    map(() => createValue('circle', 'red')),
    take(8),
    tap(observe('source 1'))
  );
const example1$ = source1$
  .pipe(
    ignoreElements()
  );
example1$
  .subscribe(observe('example 1'));

const source2$ = interval(500)
  .pipe(
    mergeMap(i => {
      if (i > 3) {
        return throwError(() => 'Some error');
      } else {
        return of(createValue('circle', 'blue'));
      }
    }),
    tap(observe('source 2'))
  )
const example2$ = source2$
  .pipe(
    ignoreElements()
  );
example2$
  .subscribe(observe('example 2'));`
};
