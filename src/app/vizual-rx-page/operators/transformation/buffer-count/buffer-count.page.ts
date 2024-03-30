import {Page} from "../../../vizual-rx-page.model";
import {BufferCountDetailsComponent} from "./buffer-count-details/buffer-count-details.component";

export const bufferCountPage: Page = {
  title: 'bufferCount',
  routeUrl: 'operators/buffer-count',
  detailsComponent: BufferCountDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/bufferCount',
  sampleCode: `import { timer, bufferCount, tap, map, take } from 'rxjs';
import { observe, createValue, colorAt } from 'vizual-rx';

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(8),
        tap(observe('source'))
    );

const example$ = source$
    .pipe(
        bufferCount(3)
    );
example$
    .subscribe(observe('example'));`
};
