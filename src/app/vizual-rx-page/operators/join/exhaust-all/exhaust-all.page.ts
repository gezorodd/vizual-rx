import {Page} from "../../../vizual-rx-page.model";
import {ExhaustAllDetailsComponent} from "./exhaust-all-details/exhaust-all-details.component";

export const exhaustAllPage: Page = {
  title: 'exhaustAll',
  routeUrl: 'operators/exhaust-all',
  detailsComponent: ExhaustAllDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/exhaust',
  sampleCode: `import {timer, map, take, tap, exhaustAll} from "rxjs";
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
        exhaustAll()
    );
example$
    .subscribe(observe('example'));`
};
