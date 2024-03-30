import {Page} from "../../../vizual-rx-page.model";
import {ExhaustDetailsComponent} from "./exhaust-details/exhaust-details.component";

export const exhaustPage: Page = {
  title: 'exhaust',
  routeUrl: 'operators/exhaust',
  detailsComponent: ExhaustDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/exhaust',
  deprecated: true,
  sampleCode: `import {timer, map, take, tap, exhaust} from "rxjs";
import {createValue, observe, shapeAt} from "vizual-rx";

const source1$ = timer(0, 1000)
    .pipe(
        map(i => createValue('blue', shapeAt(i))),
        take(5),
        tap(observe('source1'))
    );

const example$ = source1$
    .pipe(
        map(value =>
            timer(0, 600)
                .pipe(
                    map(() => createValue('red', value.shape)),
                    take(3),
                    tap(observe('inner'))
                )
        ),
        exhaust()
    );
example$
    .subscribe(observe('example'));`
};
