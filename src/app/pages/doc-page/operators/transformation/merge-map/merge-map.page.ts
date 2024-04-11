import {DocPage} from "../../../doc-page.model";
import {MergeMapDetailsComponent} from "./merge-map-details/merge-map-details.component";

export const mergeMapPage: DocPage = {
  title: 'mergeMap',
  routeUrl: 'operators/merge-map',
  detailsComponent: MergeMapDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/mergeMap',
  starred: true,
  sampleCode: `import {mergeMap, timer, tap, map, take} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 1100)
    .pipe(
        map(i => createValue(colorAt(i), 'square')),
        take(4)
    );

const example$ = source$
    .pipe(
        mergeMap((value, index) =>
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
