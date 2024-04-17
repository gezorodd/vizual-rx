import {DocPage} from "../../../doc-page.model";
import {ZipDetailsComponent} from "./zip-details/zip-details.component";

export const zipPage: DocPage = {
  title: 'zip',
  routeUrl: 'operators/zip',
  detailsComponent: ZipDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/zip',
  sampleCode: `import {zip, interval, map, take, timer} from "rxjs";
import {createValue, observe, shapeAt} from "vizual-rx";

const source1$ = interval(2000)
    .pipe(
        take(3),
        map(i => createValue('red', shapeAt(i)))
    );

const source2$ = interval(500)
    .pipe(
        take(10),
        map(i => createValue('blue', shapeAt(i)))
    );

const source3$ = timer(3000, 2000)
    .pipe(
        take(3),
        map(i => createValue('green', shapeAt(i)))
    );

const example$ = zip(source1$, source2$, source3$);

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));
source3$
    .subscribe(observe('source 3'));
example$
    .subscribe(observe('example'));`
};
