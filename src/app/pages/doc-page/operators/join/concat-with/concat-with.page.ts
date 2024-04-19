import {DocPage} from "../../../doc-page.model";
import {ConcatWithDetailsComponent} from "./concat-with-details/concat-with-details.component";

export const concatWithPage: DocPage = {
  title: 'concatWith',
  routeUrl: 'operators/concat-with',
  detailsComponent: ConcatWithDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/concatWith',
  sampleCode: `import {concatWith, interval, map, take} from "rxjs";
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
        concatWith(source2$)
    );

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));
example$
    .subscribe(observe('example'));`
};
