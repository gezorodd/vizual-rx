import {CombineAllDetailsComponent} from "./combine-all-details/combine-all-details.component";
import {DocPage} from "../../../doc-page.model";

export const combineAllPage: DocPage = {
  title: 'combineAll',
  routeUrl: 'operators/combine-all',
  detailsComponent: CombineAllDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/combineAll',
  deprecated: true,
  sampleCode: `import {combineAll, timer, map, take, from} from "rxjs";
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
        combineAll()
    )

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));
example$
    .subscribe(observe('example'));`
};
