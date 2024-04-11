import {DocPage} from "../../../doc-page.model";
import {ExhaustMapDetailsComponent} from "./exhaust-map-details/exhaust-map-details.component";

export const exhaustMapPage: DocPage = {
  title: 'exhaustMap',
  routeUrl: 'operators/exhaust-map',
  detailsComponent: ExhaustMapDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/exhaustMap',
  sampleCode: `import {exhaustMap, timer, tap, map, take} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 1100)
    .pipe(
        map(i => createValue(colorAt(i), 'square')),
        take(4)
    );

const example$ = source$
    .pipe(
        exhaustMap((value, index) =>
            timer(0, 500)
                .pipe(
                    map(() => createValue(value.color, 'circle')),
                    take(5),
                    tap(innerObservers[index])
                )
        )
    );

source$
    .subscribe(observe('source'));

const innerObservers = new Array(4).fill(undefined)
    .map((_, i) => observe('inner ' + i));

example$
    .subscribe(observe('example'));`
};
