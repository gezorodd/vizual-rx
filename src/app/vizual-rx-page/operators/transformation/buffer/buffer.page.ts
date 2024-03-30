import {Page} from "../../../vizual-rx-page.model";
import {BufferDetailsComponent} from "./buffer-details/buffer-details.component";

export const bufferPage: Page = {
  title: 'buffer',
  routeUrl: 'operators/buffer',
  detailsComponent: BufferDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/buffer',
  sampleCode: `import { fromEvent, timer, buffer, tap, map, take } from 'rxjs';
import { observe, createValue, shapeAt } from 'vizual-rx';

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(shapeAt(i), 'blue')),
        take(10),
        tap(observe('source'))
    );
const clicks$ = fromEvent(document, 'click')
    .pipe(
        map(() => createValue('green', 'circle')),
        tap(observe('clicks'))
    );

const example$ = source$
    .pipe(
        buffer(clicks$)
    );
example$
    .subscribe(observe('example'));`
};
