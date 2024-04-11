import {DocPage} from "../../../doc-page.model";
import {DistinctDetailsComponent} from "./distinct-details/distinct-details.component";

export const distinctPage: DocPage = {
  title: 'distinct',
  routeUrl: 'operators/distinct',
  detailsComponent: DistinctDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/distinct',
  sampleCode: `import {distinct, timer, map, zip, of} from "rxjs";
import {observe, createValue} from "vizual-rx";

const source$ = zip(
    timer(0, 500),
    of(
        createValue('blue', 'circle'),
        createValue('red', 'circle'),
        createValue('red', 'circle'),
        createValue('blue', 'circle'),
        createValue('green', 'circle'),
        createValue('orange', 'circle'),
        createValue('orange', 'circle'),
        createValue('blue', 'circle'),
        createValue('yellow', 'circle'),
        createValue('purple', 'circle'),
        createValue('purple', 'circle'),
        createValue('purple', 'circle'),
        createValue('red', 'circle')
    )
).pipe(
    map(([_, value]) => value)
);

const example$ = source$
    .pipe(
        distinct(value => value.color)
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
