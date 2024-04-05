import {DocPage} from "../../../doc-page.model";
import {ConcatMapToDetailsComponent} from "./concat-map-to-details/concat-map-to-details.component";

export const concatMapToPage: DocPage = {
  title: 'concatMapTo',
  routeUrl: 'operators/concat-map-to',
  detailsComponent: ConcatMapToDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/concatMapTo',
  deprecated: true,
  sampleCode: `import {timer, map, take, tap, interval, concatMapTo} from "rxjs";
import {createValue, observe, shapeAt} from "vizual-rx";

const source1$ = timer(0, 1000)
    .pipe(
        map(i => createValue('blue', shapeAt(i))),
        take(3),
        tap(observe('source1'))
    );

const source2$ = interval(500)
    .pipe(
        map(i => createValue('yellow', shapeAt(i))),
        take(3)
    );

const example$ = source1$
    .pipe(
        concatMapTo(source2$)
    );

source2$
    .subscribe(observe('source2'));
example$
    .subscribe(observe('example'));`
};
