import {DocPage} from "../../../doc-page.model";
import {WindowWhenDetailsComponent} from "./window-when-details/window-when-details.component";

export const windowWhenPage: DocPage = {
  title: 'windowWhen',
  routeUrl: 'operators/window-when',
  detailsComponent: WindowWhenDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/windowWhen',
  sampleCode: `import { timer, windowWhen, tap, map, take, mergeMap } from 'rxjs';
import { observe, createValue, shapeAt, colorAt } from 'vizual-rx';

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(shapeAt(i), 'blue')),
        take(20)
    );

const example$ = source$
    .pipe(
        windowWhen(() =>
            timer(1000 + Math.floor(Math.random() * 1000))
                .pipe(
                    map(() => createValue('green', 'circle')),
                    tap(closing)
                )
        ),
        mergeMap((win$, index) =>
            win$.pipe(
                map(v => createValue(v.shape, colorAt(index)))
            )
        )
    );

source$
    .subscribe(observe('source'));
const closing = observe('closing');
example$
    .subscribe(observe('example'));`
};
