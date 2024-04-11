import {DocPage} from "../../../doc-page.model";
import {CombineLatestAllDetailsComponent} from "./combine-latest-all-details/combine-latest-all-details.component";

export const combineLatestAllPage: DocPage = {
  title: 'combineLatestAll',
  routeUrl: 'operators/combine-latest-all',
  detailsComponent: CombineLatestAllDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/combineLatestAll',
  sampleCode: `import {combineLatestAll, timer, map, take, tap} from "rxjs";
import {createValue, observe, colorAt, shapeAt} from "vizual-rx";

const innerObservers = new Array(2).fill(undefined)
    .map((_, i) => observe('inner ' + i));

const example$ = timer(0, 500)
    .pipe(
        take(2),
        map((val) =>
            timer(val * 1000, 2000)
                .pipe(
                    map(i => createValue(colorAt(val), shapeAt(i))),
                    take(3 + (val * 2)),
                    tap(innerObservers[val as number])
                )
        ),
        combineLatestAll()
    );

example$
    .subscribe(observe('example'));`
};
