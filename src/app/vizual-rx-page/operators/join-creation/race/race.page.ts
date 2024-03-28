import {Page} from "../../../vizual-rx-page.model";
import {RaceDetailsComponent} from "./race-details/race-details.component";

export const racePage: Page = {
  title: 'race',
  routeUrl: 'operators/race',
  detailsComponent: RaceDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/race',
  sampleCode: `import {race, interval, map, take, timer} from "rxjs";
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

const source3$ = timer(1500, 500)
    .pipe(
        take(3),
        map(i => createValue('green', shapeAt(i)))
    );

const example$ = race(source1$, source2$, source3$);

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));
source3$
    .subscribe(observe('source 3'));
example$
    .subscribe(observe('example'));`
};
