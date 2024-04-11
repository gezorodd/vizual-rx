import {DocPage} from "../../../doc-page.model";
import {FilterDetailsComponent} from "./filter-details/filter-details.component";

export const filterPage: DocPage = {
  title: 'filter',
  routeUrl: 'operators/filter',
  detailsComponent: FilterDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/filter',
  starred: true,
  sampleCode: `import {filter, timer, map, take, tap} from "rxjs";
import {observe, createValue, shapeAt, colorAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i % 4), shapeAt(i))),
        take(15)
    );

const example$ = source$
    .pipe(
        filter(value => value.shape === 'square')
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
