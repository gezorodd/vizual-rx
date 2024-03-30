import {Page} from "../../../vizual-rx-page.model";
import {ConcatMapDetailsComponent} from "./concat-map-details/concat-map-details.component";

export const concatMapPage: Page = {
  title: 'concatMap',
  routeUrl: 'operators/concat-map',
  detailsComponent: ConcatMapDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/concatMap',
  sampleCode: `import {timer, map, take, tap, concatMap} from "rxjs";
import {createValue, observe, shapeAt} from "vizual-rx";

const source1$ = timer(0, 2000)
    .pipe(
        map(i => createValue('blue', shapeAt(i))),
        take(3),
        tap(observe('source1'))
    );

const example$ = source1$
    .pipe(
        concatMap(value =>
            timer(0, 500)
                .pipe(
                    map(() => createValue('red', value.shape)),
                    take(3),
                    tap(observe('inner'))
                )
        )
    );
example$
    .subscribe(observe('example'));`
};
