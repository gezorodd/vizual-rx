import {DocPage} from "../../../doc-page.model";
import {SingleDetailsComponent} from "./single-details/single-details.component";

export const singlePage: DocPage = {
  title: 'single',
  routeUrl: 'operators/single',
  detailsComponent: SingleDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/single',
  sampleCode: `import {single, interval, map, take} from "rxjs";
import {observe, createValue, shapeAt, colorAt} from "vizual-rx";

const source$ = interval(500)
    .pipe(
        map(i => createValue(colorAt(i), shapeAt(i))),
        take(10)
    );

const single$ = source$
    .pipe(
        single()
    );

const singleTriangle$ = source$
    .pipe(
        single(value => value.shape === 'triangle')
    );

const singlePurpleCircle$ = source$
    .pipe(
        single(value => value.color === 'purple' && value.shape === 'circle')
    );

source$
    .subscribe(observe('source'));
single$
    .subscribe(observe('single'));
singleTriangle$
    .subscribe(observe('single triangle'));
singlePurpleCircle$
    .subscribe(observe('single purple circle'));`
};
