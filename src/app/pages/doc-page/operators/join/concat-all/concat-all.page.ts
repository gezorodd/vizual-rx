import {DocPage} from "../../../doc-page.model";
import {ConcatAllDetailsComponent} from "./concat-all-details/concat-all-details.component";

export const concatAllPage: DocPage = {
  title: 'concatAll',
  routeUrl: 'operators/concat-all',
  detailsComponent: ConcatAllDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/concatAll',
  sampleCode: `import {concatAll, timer, tap, map, take} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 1100)
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
        concatAll()
    );

source$
    .subscribe(observe('source'));

const innerObservers = new Array(4).fill(undefined)
    .map((_, i) => observe('inner ' + i));

example$
    .subscribe(observe('example'));`
};
