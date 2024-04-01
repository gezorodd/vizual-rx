import {Page} from "../../../vizual-rx-page.model";
import {
  DistinctUntilChangedDetailsComponent
} from "./distinct-until-changed-details/distinct-until-changed-details.component";

export const distinctUntilChangedPage: Page = {
  title: 'distinctUntilChanged',
  routeUrl: 'operators/distinct-until-changed',
  detailsComponent: DistinctUntilChangedDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/distinctUntilChanged',
  starred: true,
  sampleCode: `import {distinctUntilChanged, interval, map, tap, zip, of} from "rxjs";
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
        distinctUntilChanged((v1, v2) => v1.equals(v2))
    );
example$
    .subscribe(observe('example'));`
};
