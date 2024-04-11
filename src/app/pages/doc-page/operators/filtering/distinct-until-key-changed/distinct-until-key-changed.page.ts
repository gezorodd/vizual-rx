import {DocPage} from "../../../doc-page.model";
import {
  DistinctUntilKeyChangedDetailsComponent
} from "./distinct-until-key-changed-details/distinct-until-key-changed-details.component";

export const distinctUntilKeyChangedPage: DocPage = {
  title: 'distinctUntilKeyChanged',
  routeUrl: 'operators/distinct-until-key-changed',
  detailsComponent: DistinctUntilKeyChangedDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/distinctUntilKeyChanged',
  sampleCode: `import {distinctUntilKeyChanged, timer, map, zip, of} from "rxjs";
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
        distinctUntilKeyChanged('color')
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
