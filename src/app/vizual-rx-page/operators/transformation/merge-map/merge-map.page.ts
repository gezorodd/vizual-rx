import {Page} from "../../../vizual-rx-page.model";
import {MergeMapDetailsComponent} from "./merge-map-details/merge-map-details.component";

export const mergeMapPage: Page = {
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
        take(4),
        tap(observe('source'))
    );

const innerObservers = new Array(4).fill(undefined)
    .map((_, i) => observe('inner ' + i));
    console.log(innerObservers);

const example$ = source$
    .pipe(
        mergeMap((value, index) => {
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
