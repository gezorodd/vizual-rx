import {DocPage} from "../../../doc-page.model";
import {BufferTImeDetailsComponent} from "./buffer-time-details/buffer-time-details.component";

export const bufferTimePage: DocPage = {
  title: 'bufferTime',
  routeUrl: 'operators/buffer-time',
  detailsComponent: BufferTImeDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/bufferTime',
  sampleCode: `import { timer, bufferTime, map, take } from 'rxjs';
import { observe, createValue, colorAt } from 'vizual-rx';

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(12)
    );

const example$ = source$
    .pipe(
        bufferTime(2000)
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
