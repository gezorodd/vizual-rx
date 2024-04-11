import {DocPage} from "../../../doc-page.model";
import {LastDetailsComponent} from "./last-details/last-details.component";

export const lastPage: DocPage = {
  title: 'last',
  routeUrl: 'operators/last',
  detailsComponent: LastDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/last',
  sampleCode: `import {last, timer, map, take} from "rxjs";
import {observe, createValue, colorAt, shapeAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i % 3), shapeAt(i % 4))),
        take(8)
    );

const last$ = source$
    .pipe(
        last()
    );

const lastGreen$ = source$
    .pipe(
        last(value => value.color === 'green')
    );

const lastPurple$ = source$
    .pipe(
        last(value => value.color === 'purple')
    );

source$
    .subscribe(observe('source'));
last$
    .subscribe(observe('last'));
lastGreen$
    .subscribe(observe('last green'));
lastPurple$
    .subscribe(observe('last purple'));`
};
