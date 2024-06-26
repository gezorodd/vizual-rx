import {DocPage} from "../../../doc-page.model";
import {
  DistinctUntilChangedDetailsComponent
} from "./distinct-until-changed-details/distinct-until-changed-details.component";

export const distinctUntilChangedPage: DocPage = {
  title: 'distinctUntilChanged',
  routeUrl: 'operators/distinct-until-changed',
  detailsComponent: DistinctUntilChangedDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/distinctUntilChanged',
  starred: true,
  sampleCode: `import {distinctUntilChanged, timer, map, zip, of} from "rxjs";
import {observe, createValue} from "vizual-rx";

const source$ = zip(
    timer(0, 500),
    of(
        createValue('blue', 'circle'),
        createValue('red', 'circle'),
        createValue('red', 'circle'),
        createValue('blue', 'circle'),
        createValue('green', 'circle'),
        createValue('yellow', 'circle'),
        createValue('yellow', 'circle'),
        createValue('blue', 'circle'),
        createValue('orange', 'circle'),
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
        distinctUntilChanged((v1, v2) => v1.equals(v2))
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
