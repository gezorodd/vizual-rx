import {DocPage} from "../../../doc-page.model";
import {ThrottleDetailsComponent} from "./throttle-details/throttle-details.component";

export const throttlePage: DocPage = {
  title: 'throttle',
  routeUrl: 'operators/throttle',
  detailsComponent: ThrottleDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/throttle',
  sampleCode: `import {interval, take, timer, map, tap, throttle} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source1 = observe('source 1');
const source1$ = timer(0, 600)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(10)
    );

const source2$ = interval(1400)
    .pipe(
        map(() => createValue('purple', 'square')),
        tap(observe('source 2'))
    );

const example$ = source1$
    .pipe(
        throttle(() => source2$)
    );

source1$
    .subscribe(source1);
example$
    .subscribe(observe('example'));`
};
