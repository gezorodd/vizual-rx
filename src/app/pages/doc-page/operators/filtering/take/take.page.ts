import {DocPage} from "../../../doc-page.model";
import {TakeDetailsComponent} from "./take-details/take-details.component";

export const takePage: DocPage = {
  title: 'take',
  routeUrl: 'operators/take',
  detailsComponent: TakeDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/take',
  starred: true,
  sampleCode: `import {map, take, range, delayWhen, timer} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = range(0, 8)
    .pipe(
        delayWhen((_, i) => timer(i * 500)),
        map(i => createValue('circle', colorAt(i)))
    );

const example$ = source$
    .pipe(
        take(3)
    );
source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
