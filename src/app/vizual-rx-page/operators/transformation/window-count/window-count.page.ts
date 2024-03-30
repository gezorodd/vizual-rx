import {Page} from "../../../vizual-rx-page.model";
import {WindowCountDetailsComponent} from "./window-count-details/window-count-details.component";

export const windowCountPage: Page = {
  title: 'windowCount',
  routeUrl: 'operators/window-count',
  detailsComponent: WindowCountDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/windowCount',
  sampleCode: `import {windowCount, timer, tap, take, map, mergeMap} from "rxjs";
import {observe, createValue, shapeAt, colorAt} from "vizual-rx";

const source1$ = timer(0, 500)
    .pipe(
        map(i => createValue(shapeAt(i), 'blue')),
        take(12),
        tap(observe('source1'))
    );

const example$ = source1$
    .pipe(
        windowCount(2),
        mergeMap((win$, index) =>
            win$.pipe(
                map(v => createValue(v.shape, colorAt(index)))
            )
        )
    )

example$
    .subscribe(observe('example'));`
};
