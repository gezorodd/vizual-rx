import {DocPage} from "../../../doc-page.model";
import {CombineLatestAllDetailsComponent} from "./combine-latest-all-details/combine-latest-all-details.component";

export const combineLatestAllPage: DocPage = {
  title: 'combineLatestAll',
  routeUrl: 'operators/combine-latest-all',
  detailsComponent: CombineLatestAllDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/combineLatestAll',
  starred: true,
  sampleCode: `import {combineLatestAll, timer, map, take, from} from "rxjs";
import {createValue, observe, shapeAt} from "vizual-rx";

const source1$ = timer(0, 2000)
    .pipe(
        map(i => createValue(shapeAt(i), 'blue')),
        take(3)
    );

const source2$ = timer(1000, 2000)
    .pipe(
        map(i => createValue(shapeAt(i), 'red')),
        take(3)
    );

const example$ = from([source1$, source2$])
    .pipe(
        combineLatestAll()
    )

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));
example$
    .subscribe(observe('example'));`
};
