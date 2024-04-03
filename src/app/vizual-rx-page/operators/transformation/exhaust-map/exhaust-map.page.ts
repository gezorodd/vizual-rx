import {Page} from "../../../vizual-rx-page.model";
import {ExhaustMapDetailsComponent} from "./exhaust-map-details/exhaust-map-details.component";

export const exhaustMapPage: Page = {
  title: 'exhaustMap',
  routeUrl: 'operators/exhaust-map',
  detailsComponent: ExhaustMapDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/exhaustMap',
  sampleCode: `import {exhaustMap, timer, tap, map, take} from "rxjs";
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
        exhaustMap((value, index) => {
            const inner = timer(0, 500)
                .pipe(
                    map(() => createValue(value.color, 'circle')),
                    take(5)
                );
            inner.subscribe(innerObservers[index]);
            return inner;
        })
    )

example$
    .subscribe(observe('example'));`
};
