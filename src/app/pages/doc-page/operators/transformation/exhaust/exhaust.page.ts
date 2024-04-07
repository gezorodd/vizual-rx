import {DocPage} from "../../../doc-page.model";
import {ExhaustDetailsComponent} from "./exhaust-details/exhaust-details.component";

export const exhaustPage: DocPage = {
  title: 'exhaust',
  routeUrl: 'operators/exhaust',
  detailsComponent: ExhaustDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/exhaust',
  deprecated: true,
  sampleCode: `import {exhaust, timer, tap, map, take} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 1100)
    .pipe(
        map(i => createValue(colorAt(i), 'square')),
        take(4),
        tap(observe('source'))
    );

const innerObservers = new Array(4).fill(undefined)
    .map((_, i) => observe('inner ' + i));

const example$ = source$
    .pipe(
        map((value, index) => {
            const inner = timer(0, 500)
                .pipe(
                    map(() => createValue(value.color, 'circle')),
                    take(5)
                );
            inner.subscribe(innerObservers[index]);
            return inner;
        }),
        exhaust()
    )

example$
    .subscribe(observe('example'));`
};