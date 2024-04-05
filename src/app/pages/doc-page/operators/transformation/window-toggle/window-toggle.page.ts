import {DocPage} from "../../../doc-page.model";
import {WindowToggleDetailsComponent} from "./window-toggle-details/window-toggle-details.component";

export const windowTogglePage: DocPage = {
  title: 'windowToggle',
  routeUrl: 'operators/window-toggle',
  detailsComponent: WindowToggleDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/windowToggle',
  sampleCode: `import { timer, windowToggle, tap, map, take, mergeMap } from 'rxjs';
import { observe, createValue, shapeAt, colorAt } from 'vizual-rx';

const source$ = timer(0, 550)
    .pipe(
        map(i => createValue('blue', shapeAt(i))),
        take(16),
        tap(observe('source'))
    );
const open$ = timer(0, 2000)
    .pipe(
        map(() => createValue('green', 'circle')),
        tap(observe('open')),
    );
const close$ = timer(1000)
    .pipe(
        map(() => createValue('red', 'circle')),
        tap(observe('close')),
    );

const example$ = source$
    .pipe(
        windowToggle(open$, () => close$),
        mergeMap((win$, index) =>
            win$.pipe(
                map(v => createValue(v.shape, colorAt(index)))
            )
        )
    );
example$
    .subscribe(observe('example'));`
};
