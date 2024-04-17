import {DocPage} from "../../../doc-page.model";
import {IifDetailsComponent} from "./iif-details/iif-details.component";

export const iifPage: DocPage = {
  title: 'iif',
  routeUrl: 'operators/iif',
  detailsComponent: IifDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/iif',
  sampleCode: `import {interval, take, of, mergeMap, iif} from "rxjs";
import {createValue, observe} from "vizual-rx";

const source1$ = interval(500)
    .pipe(
        take(10)
    );

const source2$ = of(createValue('blue', 'circle'));
const source3$ = of(createValue('red', 'circle'));

const example$ = source1$
    .pipe(
        mergeMap(i =>
            iif(() => i % 2 === 0, source2$, source3$)
        )
    );

source1$
    .subscribe(observe('source 1'))
example$
    .subscribe(observe('example'));`
};
