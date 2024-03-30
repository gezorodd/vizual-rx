import {Page} from "../../../vizual-rx-page.model";
import {ExhaustMapDetailsComponent} from "./exhaust-map-details/exhaust-map-details.component";

export const exhaustMapPage: Page = {
  title: 'exhaustMap',
  routeUrl: 'operators/exhaust-map',
  detailsComponent: ExhaustMapDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/exhaustMap',
  sampleCode: `import {timer, map, take, tap, exhaustMap} from "rxjs";
import {createValue, observe, shapeAt} from "vizual-rx";

const source1$ = timer(0, 1000)
    .pipe(
        map(i => createValue('blue', shapeAt(i))),
        take(5),
        tap(observe('source1'))
    );

const example$ = source1$
    .pipe(
        exhaustMap(value =>
            timer(0, 600)
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
