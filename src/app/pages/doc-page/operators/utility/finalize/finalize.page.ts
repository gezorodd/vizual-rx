import {DocPage} from "../../../doc-page.model";
import {FinalizeDetailsComponent} from "./finalize-details/finalize-details.component";

export const finalizePage: DocPage = {
  title: 'finalize',
  routeUrl: 'operators/finalize',
  detailsComponent: FinalizeDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/finalize',
  starred: true,
  sampleCode: `import { timer, finalize, map, take } from 'rxjs';
import { observe, createValue, VizualRxValueColor } from 'vizual-rx';

let color: VizualRxValueColor = 'red';

const source1$ = timer(0, 500)
    .pipe(
        map(() => createValue('blue', 'circle')),
        take(4),
        finalize(() => {
            color = 'green';
        })
    );

const source2$ = timer(0, 500)
    .pipe(
        map(() => createValue(color, 'circle')),
        take(8)
    );

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));`
};
