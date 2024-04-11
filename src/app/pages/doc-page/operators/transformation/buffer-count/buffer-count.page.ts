import {DocPage} from "../../../doc-page.model";
import {BufferCountDetailsComponent} from "./buffer-count-details/buffer-count-details.component";

export const bufferCountPage: DocPage = {
  title: 'bufferCount',
  routeUrl: 'operators/buffer-count',
  detailsComponent: BufferCountDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/bufferCount',
  sampleCode: `import { timer, bufferCount, map, take } from 'rxjs';
import { observe, createValue, colorAt } from 'vizual-rx';

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(8)
    );

const example$ = source$
    .pipe(
        bufferCount(3)
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
