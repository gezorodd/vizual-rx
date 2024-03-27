import {Page} from "../page.model";
import {RangeDetailsComponent} from "./range-details/range-details.component";

export const rangePage: Page = {
  title: 'range',
  routeUrl: 'range',
  detailsComponent: RangeDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/range',
  sampleCode: `import {range, zip, map, interval} from "rxjs";
import {observe} from "vizual-rx";

const source$ = range(5, 4);

const example$ = zip(interval(500), source$)
    .pipe(
        map(([_, value]) => value)
    );
example$
    .subscribe(observe('example'));`
};
