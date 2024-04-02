import {Page} from "../../../vizual-rx-page.model";
import {ScanDetailsComponent} from "./scan-details/scan-details.component";

export const scanPage: Page = {
  title: 'scan',
  routeUrl: 'operators/scan',
  detailsComponent: ScanDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/scan',
  sampleCode: `import {scan, timer, tap, take} from "rxjs";
import {observe} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        take(8),
        tap(observe('source'))
    );

const example$ = source$
    .pipe(
        scan((acc, value) => acc + value, 0)
    )

example$
    .subscribe(observe('example'));`
};