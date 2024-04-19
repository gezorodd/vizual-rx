import {DocPage} from "../../../doc-page.model";
import {RaceWithDetailsComponent} from "./race-with-details/race-with-details.component";

export const raceWithPage: DocPage = {
  title: 'raceWith',
  routeUrl: 'operators/race-with',
  detailsComponent: RaceWithDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/raceWith',
  sampleCode: `import {raceWith, interval, map, take, timer} from "rxjs";
import {createValue, observe, shapeAt} from "vizual-rx";

const source1$ = interval(1000)
    .pipe(
        take(3),
        map(i => createValue('red', shapeAt(i)))
    );

const source2$ = interval(800)
    .pipe(
        take(4),
        map(i => createValue('blue', shapeAt(i)))
    );

const example$ = source1$
    .pipe(
        raceWith(source2$)
    )

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));
example$
    .subscribe(observe('example'));`
};
