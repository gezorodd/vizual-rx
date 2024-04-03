import {Page} from "../../../vizual-rx-page.model";
import {ConcatMapDetailsComponent} from "./concat-map-details/concat-map-details.component";

export const concatMapPage: Page = {
  title: 'concatMap',
  routeUrl: 'operators/concat-map',
  detailsComponent: ConcatMapDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/concatMap',
  starred: true,
  sampleCode: `import {concatMap, timer, tap, map, take} from "rxjs";
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
        concatMap((value, index) => {
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
