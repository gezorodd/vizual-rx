import {DocPage} from "../../../doc-page.model";
import {BufferDetailsComponent} from "./buffer-details/buffer-details.component";

export const bufferPage: DocPage = {
  title: 'buffer',
  routeUrl: 'operators/buffer',
  detailsComponent: BufferDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/buffer',
  sampleCode: `import { interval, timer, buffer, map, take } from 'rxjs';
import { observe, createValue, shapeAt } from 'vizual-rx';

const source1$ = timer(0, 500)
    .pipe(
        map(i => createValue('blue', shapeAt(i))),
        take(12)
    );

const source2$ = interval(2200)
    .pipe(
        map(() => createValue('green', 'circle')),
        take(2)
    );

const example$ = source1$
    .pipe(
        buffer(source2$)
    );

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));
example$
    .subscribe(observe('example'));`
};
