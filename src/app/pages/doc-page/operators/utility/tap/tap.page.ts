import {DocPage} from "../../../doc-page.model";
import {TapDetailsComponent} from "./tap-details/tap-details.component";

export const tapPage: DocPage = {
  title: 'tap',
  routeUrl: 'operators/tap',
  detailsComponent: TapDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/tap',
  starred: true,
  sampleCode: `import { timer, tap, map, take } from 'rxjs';
import { observe, createValue, colorAt, VizualRxValueColor } from 'vizual-rx';

let color: VizualRxValueColor = 'purple';

const source1$ = timer(600, 1200)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        tap(value => color = value.color),
        take(4)
    );

const source2$ = timer(0, 500)
    .pipe(
        map(() => createValue(color, 'circle')),
        take(10)
    );

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));`
};
