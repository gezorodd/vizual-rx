import {DocPage} from "../../../doc-page.model";
import {FirstDetailsComponent} from "./first-details/first-details.component";

export const firstPage: DocPage = {
  title: 'first',
  routeUrl: 'operators/first',
  detailsComponent: FirstDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/first',
  starred: true,
  sampleCode: `import {first, interval, map, take} from "rxjs";
import {observe, createValue, shapeAt, colorAt} from "vizual-rx";

const source$ = interval(500)
    .pipe(
        map(i => createValue(colorAt(i), shapeAt(i))),
        take(10)
    );

const fist$ = source$
    .pipe(
        first()
    );

const firstTriangle$ = source$
    .pipe(
        first(value => value.shape === 'triangle')
    );

const firstYellowCircle$ = source$
    .pipe(
        first(value => value.color === 'yellow' && value.shape === 'circle')
    );

source$
    .subscribe(observe('source'));
fist$
    .subscribe(observe('first'));
firstTriangle$
    .subscribe(observe('first triangle'));
firstYellowCircle$
    .subscribe(observe('first yellow circle'));`
};
