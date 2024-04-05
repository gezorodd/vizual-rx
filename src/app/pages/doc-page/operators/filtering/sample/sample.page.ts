import {DocPage} from "../../../doc-page.model";
import {SampleDetailsComponent} from "./sample-details/sample-details.component";

export const samplePage: DocPage = {
  title: 'sample',
  routeUrl: 'operators/sample',
  detailsComponent: SampleDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/sample',
  sampleCode: `import {interval, take, tap, timer, map, sample} from "rxjs";
import {observe, createValue, shapeAt} from "vizual-rx";

const source1$ = timer(0, 600)
    .pipe(
        map(i => createValue(shapeAt(i), 'blue')),
        take(10),
        tap(observe('source1'))
    );

const source2$ = interval(1500)
    .pipe(
        map(() => createValue('green', 'circle')),
        take(10),
        tap(observe('source2'))
    );

const example$ = source1$
    .pipe(
        sample(source2$)
    )
example$
    .subscribe(observe('example'));`
};
