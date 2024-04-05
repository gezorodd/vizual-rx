import {DocPage} from "../../../doc-page.model";
import {FilterDetailsComponent} from "./filter-details/filter-details.component";

export const filterPage: DocPage = {
  title: 'filter',
  routeUrl: 'operators/filter',
  detailsComponent: FilterDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/filter',
  starred: true,
  sampleCode: `import {filter, interval, map, take, tap} from "rxjs";
import {observe, createValue, shapeAt, colorAt} from "vizual-rx";

const source$ = interval(500)
    .pipe(
        map(i => createValue(colorAt(i), shapeAt(i))),
        take(15),
        tap(observe('source'))
    );

const example$ = source$
    .pipe(
        filter(value => value.shape === 'square')
    );
example$
    .subscribe(observe('example'));`
};
