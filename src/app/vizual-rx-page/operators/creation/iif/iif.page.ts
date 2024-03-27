import {Page} from "../../../vizual-rx-page.model";
import {IifDetailsComponent} from "./iif-details/iif-details.component";

export const iifPage: Page = {
  title: 'iif',
  routeUrl: 'operators/iif',
  detailsComponent: IifDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/iif',
  sampleCode: `import {interval, take, tap, of, mergeMap, iif} from "rxjs";
import {createValue, observe} from "vizual-rx";

const source1$ = interval(500)
    .pipe(
        take(10),
        tap(observe("source 1"))
    );

const source2$ = of(createValue('blue', 'circle'));
const source3$ = of(createValue('red', 'circle'));

const example1$ = source1$
    .pipe(
        mergeMap(i =>
            iif(() => i % 2, source2$, source3$)
        )
    );
example1$
    .subscribe(observe('example'));`
};
