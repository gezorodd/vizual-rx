import {Page} from "../../../vizual-rx-page.model";
import {OfDetailsComponent} from "./of-details/of-details.component";

export const ofPage: Page = {
  title: 'of',
  routeUrl: 'operators/of',
  detailsComponent: OfDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/of',
  starred: true,
  sampleCode: `import {of, delayWhen, timer} from "rxjs";
import {observe, createValue} from "vizual-rx";

const example$ = of(
    createValue('red', 'circle'),
    createValue('blue', 'circle'),
    createValue('green', 'circle')
).pipe(
    delayWhen((_, i) => timer(i * 500))
);
example$
    .subscribe(observe('example'));`
};
