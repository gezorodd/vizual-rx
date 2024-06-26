import {DocPage} from "../../../doc-page.model";
import {ExhaustDetailsComponent} from "./exhaust-details/exhaust-details.component";

export const exhaustPage: DocPage = {
  title: 'exhaust',
  routeUrl: 'operators/exhaust',
  detailsComponent: ExhaustDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/exhaust',
  deprecated: true,
  sampleCode: `import {exhaust, timer, map, tap, take} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 1000)
    .pipe(
        map(i => createValue(colorAt(i), 'square')),
        take(4)
    );

const example$ = source$
    .pipe(
        map((value, index) =>
            timer(0, 500)
                .pipe(
                    map(() => createValue(value.color, 'circle')),
                    take(5),
                    tap(innerObservers[index])
                )
        ),
        exhaust()
    );

source$
    .subscribe(observe('source'));

const innerObservers = new Array(4).fill(undefined)
    .map((_, i) => observe('inner ' + i));

example$
    .subscribe(observe('example'));`
};
