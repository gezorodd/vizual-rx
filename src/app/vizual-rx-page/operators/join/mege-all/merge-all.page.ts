import {Page} from "../../../vizual-rx-page.model";
import {MergeAllDetailsComponent} from "./merge-all-details/merge-all-details.component";

export const mergeAllPage: Page = {
  title: 'mergeAll',
  routeUrl: 'operators/merge-all',
  detailsComponent: MergeAllDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/mergeAll',
  sampleCode: `import {mergeAll, timer, tap, map, take} from "rxjs";
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
        mergeAll()
    )

example$
    .subscribe(observe('example'));`
};
