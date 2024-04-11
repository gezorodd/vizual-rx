import {DocPage} from "../../../doc-page.model";
import {MergeScanDetailsComponent} from "./merge-scan-details/merge-scan-details.component";

export const mergeScanPage: DocPage = {
  title: 'mergeScan',
  routeUrl: 'operators/merge-scan',
  detailsComponent: MergeScanDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/mergeScan',
  sampleCode: `import {mergeScan, timer, take, of} from "rxjs";
import {observe} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        take(8)
    );

const example$ = source$
    .pipe(
        mergeScan((acc, value) => of(acc + value), 0)
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
