import {Page} from "../../../vizual-rx-page.model";
import {DistinctDetailsComponent} from "./distinct-details/distinct-details.component";

export const distinctPage: Page = {
  title: 'distinct',
  routeUrl: 'operators/distinct',
  detailsComponent: DistinctDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/distinct',
  sampleCode: `import {distinct, interval, map, tap, zip, of} from "rxjs";
import {observe, createValue} from "vizual-rx";

const source$ = zip(
    interval(500),
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
    map(([_, value]) => value),
    tap(observe('source'))
);

const example$ = source$
    .pipe(
        distinct(value => value.color)
    );
example$
    .subscribe(observe('example'));`
};
