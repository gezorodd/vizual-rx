import {DocPage} from "../../../doc-page.model";
import {WindowDetailsComponent} from "./window-details/window-details.component";

export const windowPage: DocPage = {
  title: 'window',
  routeUrl: 'operators/window',
  detailsComponent: WindowDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/window',
  sampleCode: `import {window, timer, take, map, mergeMap, interval} from "rxjs";
import {observe, createValue, shapeAt, colorAt} from "vizual-rx";

const source1$ = timer(0, 500)
    .pipe(
        map(i => createValue(shapeAt(i), 'blue')),
        take(12)
    );

const source2$ = interval(1200)
    .pipe(
        map(() => createValue('purple', 'circle')),
        take(3)
    )

const example$ = source1$
    .pipe(
        window(source2$),
        mergeMap((win$, index) =>
            win$.pipe(
                map(v => createValue(v.shape, colorAt(index)))
            )
        )
    );

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));
example$
    .subscribe(observe('example'));`
};
