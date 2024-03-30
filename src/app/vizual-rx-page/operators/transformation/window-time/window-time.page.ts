import {Page} from "../../../vizual-rx-page.model";
import {WindowTimeDetailsComponent} from "./window-time-details/window-time-details.component";

export const windowTimePage: Page = {
  title: 'windowTime',
  routeUrl: 'operators/window-time',
  detailsComponent: WindowTimeDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/windowTime',
  sampleCode: `import {windowTime, timer, tap, take, map, mergeMap} from "rxjs";
import {observe, createValue, shapeAt, colorAt} from "vizual-rx";

const source1$ = timer(0, 500)
    .pipe(
        map(i => createValue(shapeAt(i), 'blue')),
        take(12),
        tap(observe('source1'))
    );

const example$ = source1$
    .pipe(
        windowTime(1000),
        mergeMap((win$, index) =>
            win$.pipe(
                map(v => createValue(v.shape, colorAt(index)))
            )
        )
    )

example$
    .subscribe(observe('example'));`
};
