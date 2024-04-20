import {DocPage} from "../../../doc-page.model";
import {MergeDetailsComponent} from "./merge-details/merge-details.component";

export const mergePage: DocPage = {
  title: 'merge',
  routeUrl: 'operators/merge',
  detailsComponent: MergeDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/merge',
  starred: true,
  sampleCode: `import {map, timer, take, merge} from "rxjs";
import {createValue, observe} from "vizual-rx";

const source1$ = timer(0, 500)
    .pipe(
        map(() => createValue('red', 'circle')),
        take(5)
    );

const source2$ = timer(1000, 1000)
    .pipe(
        map(() => createValue('blue', 'circle')),
        take(3)
    );

const source3$ = timer(1500, 500)
    .pipe(
        map(() => createValue('green', 'circle')),
        take(3)
    );

const example$ = merge(source1$, source2$, source3$);

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));
source3$
    .subscribe(observe('source 3'));
example$
    .subscribe(observe('example'));`
};
