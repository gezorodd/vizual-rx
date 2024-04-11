import {DocPage} from "../../../doc-page.model";
import {WithLatestFromDetailsComponent} from "./with-latest-from-details/with-latest-from-details.component";

export const withLatestFromPage: DocPage = {
  title: 'withLatestFrom',
  routeUrl: 'operators/with-latest-from',
  detailsComponent: WithLatestFromDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/withLatestFrom',
  sampleCode: `import {withLatestFrom, timer, map, take} from "rxjs";
import {createValue, observe, shapeAt} from "vizual-rx";

const source1$ = timer(0, 2000)
    .pipe(
        map(i => createValue('red', shapeAt(i))),
        take(5)
    );

const source2$ = timer(1000, 2000)
    .pipe(
        map(i => createValue('blue', shapeAt(i))),
        take(3)
    );

const example$ = source1$
    .pipe(
        withLatestFrom(source2$)
    );

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));
example$
    .subscribe(observe('example'));`
};
