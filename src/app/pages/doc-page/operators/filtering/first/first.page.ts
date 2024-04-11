import {DocPage} from "../../../doc-page.model";
import {FirstDetailsComponent} from "./first-details/first-details.component";

export const firstPage: DocPage = {
  title: 'first',
  routeUrl: 'operators/first',
  detailsComponent: FirstDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/first',
  starred: true,
  sampleCode: `import {first, timer, map, take} from "rxjs";
import {observe, createValue, colorAt, shapeAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i % 3), shapeAt(i % 4))),
        take(8)
    );

const fist$ = source$
    .pipe(
        first()
    );

const firstGreen$ = source$
    .pipe(
        first(value => value.color === 'green')
    );

const firstPurple$ = source$
    .pipe(
        first(value => value.color === 'purple')
    );

source$
    .subscribe(observe('source'));
fist$
    .subscribe(observe('first'));
firstGreen$
    .subscribe(observe('first green'));
firstPurple$
    .subscribe(observe('first purple'));`
};
