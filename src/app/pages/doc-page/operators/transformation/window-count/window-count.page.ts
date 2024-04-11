import {DocPage} from "../../../doc-page.model";
import {WindowCountDetailsComponent} from "./window-count-details/window-count-details.component";

export const windowCountPage: DocPage = {
  title: 'windowCount',
  routeUrl: 'operators/window-count',
  detailsComponent: WindowCountDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/windowCount',
  sampleCode: `import {windowCount, timer, take, map, mergeMap} from "rxjs";
import {observe, createValue, shapeAt, colorAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(shapeAt(i), 'blue')),
        take(12)
    );

const example$ = source$
    .pipe(
        windowCount(2),
        mergeMap((win$, index) =>
            win$.pipe(
                map(v => createValue(v.shape, colorAt(index)))
            )
        )
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
