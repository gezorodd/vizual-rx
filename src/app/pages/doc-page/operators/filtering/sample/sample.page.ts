import {DocPage} from "../../../doc-page.model";
import {SampleDetailsComponent} from "./sample-details/sample-details.component";

export const samplePage: DocPage = {
  title: 'sample',
  routeUrl: 'operators/sample',
  detailsComponent: SampleDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/sample',
  sampleCode: `import {interval, take, timer, map, sample} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source1$ = timer(0, 600)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(10)
    );

const source2$ = interval(1400)
    .pipe(
        map(() => createValue('purple', 'square')),
        take(3)
    );

const example$ = source1$
    .pipe(
        sample(source2$)
    );

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));
example$
    .subscribe(observe('example'));`
};
