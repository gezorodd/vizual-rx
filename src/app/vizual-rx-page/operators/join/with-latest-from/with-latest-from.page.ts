import {Page} from "../../../vizual-rx-page.model";
import {WithLatestFromDetailsComponent} from "./with-latest-from-details/with-latest-from-details.component";

export const withLatestFromPage: Page = {
  title: 'withLatestFrom',
  routeUrl: 'operators/with-latest-from',
  detailsComponent: WithLatestFromDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/withLatestFrom',
  sampleCode: `import {withLatestFrom, timer, map, take, tap} from "rxjs";
import {createValue, observe, shapeAt} from "vizual-rx";

const source1$ = timer(0, 2000)
    .pipe(
        map(i => createValue('red', shapeAt(i))),
        take(5),
        tap(observe('source1'))
    );

const source2$ = timer(1000, 2000)
    .pipe(
        map(i => createValue('blue', shapeAt(i))),
        take(3),
        tap(observe('source2'))
    );

const example$ = source1$
    .pipe(
        withLatestFrom(source2$)
    )

example$
    .subscribe(observe('example'));`
};
