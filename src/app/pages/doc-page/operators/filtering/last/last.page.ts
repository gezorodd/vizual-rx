import {DocPage} from "../../../doc-page.model";
import {LastDetailsComponent} from "./last-details/last-details.component";

export const lastPage: DocPage = {
  title: 'last',
  routeUrl: 'operators/last',
  detailsComponent: LastDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/last',
  sampleCode: `import {last, interval, map, take} from "rxjs";
import {observe, createValue, shapeAt, colorAt} from "vizual-rx";

const source$ = interval(500)
    .pipe(
        map(i => createValue(colorAt(i), shapeAt(i))),
        take(7)
    );

const last$ = source$
    .pipe(
        last()
    );

const lastCircle$ = source$
    .pipe(
        last(value => value.shape === 'circle')
    );

const lastYellowCircle$ = source$
    .pipe(
        last(value => value.color === 'yellow' && value.shape === 'circle')
    );

source$
    .subscribe(observe('source'));
last$
    .subscribe(observe('last'));
lastCircle$
    .subscribe(observe('last circle'));
lastYellowCircle$
    .subscribe(observe('last yellow circle'));`
};
