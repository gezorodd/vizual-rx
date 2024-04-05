import {DocPage} from "../../../doc-page.model";
import {BufferToggleDetailsComponent} from "./buffer-toggle-details/buffer-toggle-details.component";

export const bufferTogglePage: DocPage = {
  title: 'bufferToggle',
  routeUrl: 'operators/buffer-toggle',
  detailsComponent: BufferToggleDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/bufferToggle',
  sampleCode: `import { timer, bufferToggle, tap, map, take } from 'rxjs';
import { observe, createValue, shapeAt } from 'vizual-rx';

const source$ = timer(0, 550)
    .pipe(
        map(i => createValue('blue', shapeAt(i))),
        take(10),
        tap(observe('source'))
    );
const open$ = timer(0, 3000)
    .pipe(
        map(() => createValue('green', 'circle')),
        tap(observe('open')),
    );
const close$ = timer(1200)
    .pipe(
        map(() => createValue('red', 'circle')),
        tap(observe('close')),
    );

const example$ = source$
    .pipe(
        bufferToggle(open$, () => close$)
    );
example$
    .subscribe(observe('example'));`
};
