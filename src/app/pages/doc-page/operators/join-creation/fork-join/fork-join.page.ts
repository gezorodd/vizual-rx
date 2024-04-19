import {DocPage} from "../../../doc-page.model";
import {ForkJoinDetailsComponent} from "./fork-join-details/fork-join-details.component";

export const forkJoinPage: DocPage = {
  title: 'forkJoin',
  routeUrl: 'operators/fork-join',
  detailsComponent: ForkJoinDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/forkJoin',
  sampleCode: `import {map, interval, take, timer, forkJoin} from "rxjs";
import {createValue, observe, shapeAt} from "vizual-rx";

const source1$ = interval(500)
    .pipe(
        map(i => createValue('red', shapeAt(i))),
        take(5)
    );

const source2$ = interval(1000)
    .pipe(
        map(i => createValue('blue', shapeAt(i))),
        take(4)
    );

const source3$ = timer(0, 3000)
    .pipe(
        map(i => createValue('green', shapeAt(i))),
        take(3)
    );

const example$ = forkJoin(source1$, source2$, source3$);

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));
source3$
    .subscribe(observe('source 3'));
example$
    .subscribe(observe('example'));`
};
