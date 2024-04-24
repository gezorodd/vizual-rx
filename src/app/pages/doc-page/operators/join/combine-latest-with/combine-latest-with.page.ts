import {DocPage} from "../../../doc-page.model";
import {CombineLatestWithDetailsComponent} from "./combine-latest-with-details/combine-latest-with-details.component";

export const combineLatestWithPage: DocPage = {
  title: 'combineLatestWith',
  routeUrl: 'operators/combine-latest-with',
  detailsComponent: CombineLatestWithDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/combineLatestWith',
  sampleCode: `import {combineLatestWith, timer, map, take} from "rxjs";
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

const example$ = source1$
    .pipe(
        combineLatestWith(source2$)
    )

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));
example$
    .subscribe(observe('example'));`
};
