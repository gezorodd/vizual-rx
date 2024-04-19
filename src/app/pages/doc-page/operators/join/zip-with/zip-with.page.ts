import {DocPage} from "../../../doc-page.model";
import {ZipWithDetailsComponent} from "./zip-with-details/zip-with-details.component";

export const zipWithPage: DocPage = {
  title: 'zipWith',
  routeUrl: 'operators/zip-with',
  detailsComponent: ZipWithDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/zipWith',
  sampleCode: `import {zipWith, interval, map, take} from "rxjs";
import {createValue, observe, shapeAt} from "vizual-rx";

const source1$ = interval(1000)
    .pipe(
        take(5),
        map(i => createValue('red', shapeAt(i)))
    );

const source2$ = interval(500)
    .pipe(
        take(5),
        map(i => createValue('blue', shapeAt(i)))
    );

const example$ = source1$
    .pipe(
        zipWith(source2$)
    );

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));
example$
    .subscribe(observe('example'));`
};
