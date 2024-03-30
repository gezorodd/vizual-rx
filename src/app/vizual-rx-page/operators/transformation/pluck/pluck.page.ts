import {Page} from "../../../vizual-rx-page.model";
import {PluckDetailsComponent} from "./pluck-details/pluck-details.component";

export const pluckPage: Page = {
  title: 'pluck',
  routeUrl: 'operators/pluck',
  detailsComponent: PluckDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/pluck',
  deprecated: true,
  sampleCode: `import {timer, take, tap, map, pluck} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source1$ = timer(0, 500)
    .pipe(
        map(i => {
            const value = createValue(colorAt(i), 'circle');
            value.id = i + 1;
            return value;
        }),
        take(8),
        tap(observe('source1'))
    );

const example$ = source1$
    .pipe(
        pluck('id')
    );
example$
    .subscribe(observe('example'));`
};
