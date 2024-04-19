import {DocPage} from "../../../doc-page.model";
import {MergeWithDetailsComponent} from "./merge-with-details/merge-with-details.component";

export const mergeWithPage: DocPage = {
  title: 'mergeWith',
  routeUrl: 'operators/merge-with',
  detailsComponent: MergeWithDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/mergeWith',
  sampleCode: `import {mergeWith, interval, map, take} from "rxjs";
import {createValue, observe, shapeAt} from "vizual-rx";

const source1$ = interval(500)
    .pipe(
        map(i => createValue('red', shapeAt(i))),
        take(3)
    );

const source2$ = interval(500)
    .pipe(
        map(i => createValue('blue', shapeAt(i))),
        take(3)
    );

const example$ = source1$
    .pipe(
        mergeWith(source2$)
    );

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));
example$
    .subscribe(observe('example'));`
};
