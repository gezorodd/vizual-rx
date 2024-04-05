import {DocPage} from "../../../doc-page.model";
import {ThrottleDetailsComponent} from "./throttle-details/throttle-details.component";

export const throttlePage: DocPage = {
  title: 'throttle',
  routeUrl: 'operators/throttle',
  detailsComponent: ThrottleDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/throttle',
  sampleCode: `import {interval, take, tap, timer, map, throttle} from "rxjs";
import {observe, createValue, shapeAt} from "vizual-rx";

const source1$ = timer(0, 600)
    .pipe(
        map(i => createValue(shapeAt(i), 'blue')),
        take(10),
        tap(observe('source1'))
    );

const source2$ = interval(1500)
    .pipe(
        map(() => createValue('green', 'circle')),
        take(10),
        tap(observe('source2'))
    );

const example$ = source1$
    .pipe(
        throttle(() => source2$)
    )
example$
    .subscribe(observe('example'));`
};
