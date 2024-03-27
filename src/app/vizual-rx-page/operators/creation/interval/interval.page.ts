import {Page} from "../../../vizual-rx-page.model";
import {IntervalDetailsComponent} from "./interval-details/interval-details.component";

export const intervalPage: Page = {
  title: 'interval',
  routeUrl: 'interval',
  detailsComponent: IntervalDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/interval',
  sampleCode: `import {interval, take} from "rxjs";
import {observe} from "vizual-rx";

const example$ = interval(500)
    .pipe(
        take(5)
    );
example$
    .subscribe(observe('example'));`
};
