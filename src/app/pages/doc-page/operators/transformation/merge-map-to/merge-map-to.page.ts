import {DocPage} from "../../../doc-page.model";
import {MergeMapToDetailsComponent} from "./merge-map-to-details/merge-map-to-details.component";

export const mergeMapToPage: DocPage = {
  title: 'mergeMapTo',
  routeUrl: 'operators/merge-map-to',
  detailsComponent: MergeMapToDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/mergeMapTo',
  deprecated: true,
  sampleCode: `import {mergeMapTo, timer, map, take} from "rxjs";
import {observe, createValue, shapeAt} from "vizual-rx";

const source1$ = timer(0, 2000)
    .pipe(
        map(i => createValue('blue', shapeAt(i))),
        take(3)
    );

const source2$ = timer(0, 500)
    .pipe(
        map(i => createValue(shapeAt(i), 'red')),
        take(3)
    );

const example$ = source1$
    .pipe(
        mergeMapTo(source2$)
    );

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));
example$
    .subscribe(observe('example'));`
};
