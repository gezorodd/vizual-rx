import {Page} from "../../../vizual-rx-page.model";
import {RangeDetailsComponent} from "./range-details/range-details.component";

export const rangePage: Page = {
  title: 'range',
  routeUrl: 'operators/range',
  detailsComponent: RangeDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/range',
  sampleCode: `import {range, delayWhen, timer} from "rxjs";
import {observe} from "vizual-rx";

const example$ = range(5, 4)
    .pipe(
        delayWhen((_, i) => timer(i * 500))
    );
example$
    .subscribe(observe('example'));`
};
