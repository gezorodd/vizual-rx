import {DocPage} from "../../../doc-page.model";
import {IntervalDetailsComponent} from "./interval-details/interval-details.component";

export const intervalPage: DocPage = {
  title: 'interval',
  routeUrl: 'operators/interval',
  detailsComponent: IntervalDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/interval',
  starred: true,
  sampleCode: `import {interval, take} from "rxjs";
import {observe} from "vizual-rx";

const example$ = interval(500)
    .pipe(
        take(5)
    );
example$
    .subscribe(observe('example'));`
};
