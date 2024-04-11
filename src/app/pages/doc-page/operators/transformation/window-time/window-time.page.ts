import {DocPage} from "../../../doc-page.model";
import {WindowTimeDetailsComponent} from "./window-time-details/window-time-details.component";

export const windowTimePage: DocPage = {
  title: 'windowTime',
  routeUrl: 'operators/window-time',
  detailsComponent: WindowTimeDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/windowTime',
  sampleCode: `import {windowTime, timer, take, map, mergeMap} from "rxjs";
import {observe, createValue, shapeAt, colorAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(shapeAt(i), 'blue')),
        take(12)
    );

const example$ = source$
    .pipe(
        windowTime(1000),
        mergeMap((win$, index) =>
            win$.pipe(
                map(v => createValue(v.shape, colorAt(index)))
            )
        )
    )

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
