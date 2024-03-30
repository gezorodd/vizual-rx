import {Page} from "../../../vizual-rx-page.model";
import {ConcatMapToDetailsComponent} from "./concat-map-to-details/concat-map-to-details.component";

export const concatMapToPage: Page = {
  title: 'concatMapTo',
  routeUrl: 'operators/concat-map-to',
  detailsComponent: ConcatMapToDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/concatMapTo',
  deprecated: true,
  sampleCode: `import {timer, map, take, tap, concatMapTo} from "rxjs";
import {createValue, observe, shapeAt} from "vizual-rx";

const source1$ = timer(0, 2000)
    .pipe(
        map(i => createValue('blue', shapeAt(i))),
        take(3),
        tap(observe('source1'))
    );

const inner$ = timer(0, 500)
    .pipe(
        map(i => createValue('red', shapeAt(i))),
        take(3),
        tap(observe('inner'))
    );

const example$ = source1$
    .pipe(
        concatMapTo(inner$)
    );
example$
    .subscribe(observe('example'));`
};
