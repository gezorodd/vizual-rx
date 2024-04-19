import {DocPage} from "../../../doc-page.model";
import {ConcatDetailsComponent} from "./concat-details/concat-details.component";

export const concatPage: DocPage = {
  title: 'concat',
  routeUrl: 'operators/concat',
  detailsComponent: ConcatDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/concat',
  starred: true,
  sampleCode: `import {concat, interval, map, take} from "rxjs";
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

const source3$ = interval(500)
    .pipe(
        map(i => createValue('green', shapeAt(i))),
        take(3)
    );

const example$ = concat(source1$, source2$, source3$);

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));
source3$
    .subscribe(observe('source 3'));
example$
    .subscribe(observe('example'));`
};
