import {DocPage} from "../../../doc-page.model";
import {PluckDetailsComponent} from "./pluck-details/pluck-details.component";

export const pluckPage: DocPage = {
  title: 'pluck',
  routeUrl: 'operators/pluck',
  detailsComponent: PluckDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/pluck',
  deprecated: true,
  sampleCode: `import {timer, take, map, pluck} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(8)
    );

const example$ = source$
    .pipe(
        pluck('color')
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
