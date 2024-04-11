import {DocPage} from "../../../doc-page.model";
import {SingleDetailsComponent} from "./single-details/single-details.component";

export const singlePage: DocPage = {
  title: 'single',
  routeUrl: 'operators/single',
  detailsComponent: SingleDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/single',
  sampleCode: `import {single, interval, map, take} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = interval(500)
    .pipe(
        map(i => createValue(colorAt(i % 6), 'circle')),
        take(10)
    );

const single$ = source$
    .pipe(
        single()
    );

const singleRed$ = source$
    .pipe(
        single(value => value.color === 'red')
    );

const singlePurple$ = source$
    .pipe(
        single(value => value.color === 'purple')
    );

source$
    .subscribe(observe('source'));
single$
    .subscribe(observe('single'));
singleRed$
    .subscribe(observe('single red'));
singlePurple$
    .subscribe(observe('single purple'));`
};
