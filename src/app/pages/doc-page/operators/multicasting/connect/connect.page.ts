import {DocPage} from "../../../doc-page.model";
import {ConnectDetailsComponent} from "./connect-details/connect-details.component";

export const connectPage: DocPage = {
  title: 'connect',
  routeUrl: 'operators/connect',
  detailsComponent: ConnectDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/connect',
  sampleCode: `import { defer, of, connect, merge, tap, map, bufferCount} from 'rxjs';
import { observe, createValue, colorAt, shapeAt } from 'vizual-rx'

const source$ = defer(() => {
    const color = colorAt(Math.floor(Math.random() * 3));
    const shape = shapeAt(Math.floor(Math.random() * 3));
    return of(createValue(color, shape));
}).pipe(
    tap(observe('source'))
);

const example$ = source$
    .pipe(
        connect(shared$ =>
            merge(
                shared$
                    .pipe(
                        map(v => createValue(v.color, 'diamond'))
                    ),
                shared$
                    .pipe(
                        map(v => createValue(v.shape, 'purple'))
                    )
            )
        ),
        bufferCount(2)
    );
example$
    .subscribe(observe('example'));`
};
