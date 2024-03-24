import {CombineLatestDetailsComponent} from "./combine-latest-details/combine-latest-details.component";
import {combinationSection} from "../page";

export const combineLatestPage = {
  title: 'combineLatest',
  routeUrl: 'combine-latest',
  section: combinationSection,
  detailsComponent: CombineLatestDetailsComponent,
  sampleCode: `import {combineLatest, timer, map, take, tap} from "rxjs";
import {createValue, observe, shapeAt} from "vizual-rx";

const source1$ = timer(0, 2000)
    .pipe(
        map(i => createValue('red', shapeAt(i))),
        take(3),
        tap(observe('source1'))
    );

const source2$ = timer(1000, 2000)
    .pipe(
        map(i => createValue('blue', shapeAt(i))),
        take(5),
        tap(observe('source2'))
    );

const example$ = combineLatest([source1$, source2$]);

example$
    .subscribe(observe('example'));`
};
