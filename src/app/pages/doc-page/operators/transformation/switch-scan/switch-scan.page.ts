import {DocPage} from "../../../doc-page.model";
import {SwitchScanDetailsComponent} from "./switch-scan-details/switch-scan-details.component";

export const switchScanPage: DocPage = {
  title: 'switchScan',
  routeUrl: 'operators/switch-scan',
  detailsComponent: SwitchScanDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/switchScan',
  sampleCode: `import {switchScan, timer, take, map} from "rxjs";
import {observe} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        take(4)
    );

const example$ = source$
    .pipe(
        switchScan((acc, value) =>
            timer(0, 500)
                .pipe(
                    map(i => acc + value * i),
                    take(8)
                )
        , 0)
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
