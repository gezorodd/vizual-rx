import {DocPage} from "../../../doc-page.model";
import {BufferWhenDetailsComponent} from "./buffer-when-details/buffer-when-details.component";

export const bufferWhenPage: DocPage = {
  title: 'bufferWhen',
  routeUrl: 'operators/buffer-when',
  detailsComponent: BufferWhenDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/bufferWhen',
  sampleCode: `import { timer, bufferWhen, tap, map, take } from 'rxjs';
import { observe, createValue, shapeAt } from 'vizual-rx';

const source$ = timer(0, 1000)
    .pipe(
        map(i => createValue(shapeAt(i), 'blue')),
        take(10),
        tap(observe('source'))
    );

const closing = observe('closing');
const example$ = source$
    .pipe(
        bufferWhen(() =>
            timer(1000 + Math.floor(Math.random() * 3) * 1000)
                .pipe(
                    map(() => createValue('green', 'circle')),
                    tap(closing)
                )
        )
    );
example$
    .subscribe(observe('example'));`
};
