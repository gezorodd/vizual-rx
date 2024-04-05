import {DocPage} from "../../../doc-page.model";
import {ThrottleTimeDetailsComponent} from "./throttle-time-details/throttle-time-details.component";

export const throttleTimePage: DocPage = {
  title: 'throttleTime',
  routeUrl: 'operators/throttle-time',
  detailsComponent: ThrottleTimeDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/throttleTime',
  sampleCode: `import {take, tap, timer, map, throttleTime} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 600)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(10),
        tap(observe('source'))
    );

const example$ = source$
    .pipe(
        throttleTime(1500)
    )
example$
    .subscribe(observe('example'));`
};
