import {DocPage} from "../../../doc-page.model";
import {ConcatMapDetailsComponent} from "./concat-map-details/concat-map-details.component";

export const concatMapPage: DocPage = {
  title: 'concatMap',
  routeUrl: 'operators/concat-map',
  detailsComponent: ConcatMapDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/concatMap',
  starred: true,
  sampleCode: `import {concatMap, timer, tap, map, take} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 1000)
    .pipe(
        map(i => createValue(colorAt(i), 'square')),
        take(4)
    );

const example$ = source$
    .pipe(
        concatMap((value, index) =>
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
