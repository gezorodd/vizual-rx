import {DocPage} from "../../../doc-page.model";
import {ScanDetailsComponent} from "./scan-details/scan-details.component";

export const scanPage: DocPage = {
  title: 'scan',
  routeUrl: 'operators/scan',
  detailsComponent: ScanDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/scan',
  sampleCode: `import {scan, timer, take} from "rxjs";
import {observe} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        take(8)
    );

const example$ = source$
    .pipe(
        scan((acc, value) => acc + value, 0)
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
