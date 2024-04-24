import {CombineLatestDetailsComponent} from "./combine-latest-details/combine-latest-details.component";
import {DocPage} from "../../../doc-page.model";

export const combineLatestPage: DocPage = {
  title: 'combineLatest',
  routeUrl: 'operators/combine-latest',
  detailsComponent: CombineLatestDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/combineLatest',
  starred: true,
  sampleCode: `import {combineLatest, timer, map, take} from "rxjs";
import {createValue, observe, shapeAt} from "vizual-rx";

const source1$ = timer(0, 2000)
    .pipe(
        map(i => createValue('red', shapeAt(i))),
        take(3)
    );

const source2$ = timer(1000, 2000)
    .pipe(
        map(i => createValue('blue', shapeAt(i))),
        take(3)
    );

const example$ = combineLatest([source1$, source2$]);

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));
example$
    .subscribe(observe('example'));`
};
