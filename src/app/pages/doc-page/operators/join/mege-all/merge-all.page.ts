import {DocPage} from "../../../doc-page.model";
import {MergeAllDetailsComponent} from "./merge-all-details/merge-all-details.component";

export const mergeAllPage: DocPage = {
  title: 'mergeAll',
  routeUrl: 'operators/merge-all',
  detailsComponent: MergeAllDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/mergeAll',
  sampleCode: `import {mergeAll, timer, tap, map, take} from "rxjs";
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
        mergeAll()
    );

source$
    .subscribe(observe('source'));

const innerObservers = new Array(4).fill(undefined)
    .map((_, i) => observe('inner ' + i));

example$
    .subscribe(observe('example'));`
};
