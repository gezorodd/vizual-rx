import {DocPage} from "../../../doc-page.model";
import {RangeDetailsComponent} from "./range-details/range-details.component";

export const rangePage: DocPage = {
  title: 'range',
  routeUrl: 'operators/range',
  detailsComponent: RangeDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/range',
  sampleCode: `import {range} from "rxjs";
import {observe} from "vizual-rx";

const example$ = range(5, 4);
example$
    .subscribe(observe('example'));`
};
