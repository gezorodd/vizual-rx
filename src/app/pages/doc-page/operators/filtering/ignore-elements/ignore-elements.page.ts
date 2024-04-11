import {DocPage} from "../../../doc-page.model";
import {IgnoreElementsDetailsComponent} from "./ignore-elements-details/ignore-elements-details.component";

export const ignoreElementsPage: DocPage = {
  title: 'ignoreElements',
  routeUrl: 'operators/ignore-elements',
  detailsComponent: IgnoreElementsDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/ignoreElements',
  sampleCode: `import {ignoreElements, timer, map, take, mergeMap, throwError, of} from "rxjs";
import {observe, createValue} from "vizual-rx";

const source1$ = timer(0, 500)
  .pipe(
    map(() => createValue('circle', 'red')),
    take(8)
  );

const source2$ = timer(0, 500)
  .pipe(
    mergeMap(i => {
      if (i > 3) {
        return throwError(() => 'Some error');
      } else {
        return of(createValue('circle', 'blue'));
      }
    })
  );

const example1$ = source1$
  .pipe(
    ignoreElements()
  );

const example2$ = source2$
  .pipe(
    ignoreElements()
  );

source1$
  .subscribe(observe('source 1'));
example1$
  .subscribe(observe('example 1'));
source2$
  .subscribe(observe('source 2'));
example2$
  .subscribe(observe('example 2'));`
};
