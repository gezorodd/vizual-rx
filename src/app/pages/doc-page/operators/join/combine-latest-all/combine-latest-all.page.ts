import {DocPage} from "../../../doc-page.model";
import {CombineLatestAllDetailsComponent} from "./combine-latest-all-details/combine-latest-all-details.component";

export const combineLatestAllPage: DocPage = {
  title: 'combineLatestAll',
  routeUrl: 'operators/combine-latest-all',
  detailsComponent: CombineLatestAllDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/combineLatestAll',
  sampleCode: `import {combineLatestAll, timer, map, take, tap} from "rxjs";
import {createValue, observe, colorAt, shapeAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        take(2),
        tap(observe("source"))
    );

const example$ = source$
    .pipe(
        map((val) =>
            timer(val * 1000, 2000)
                .pipe(
                    map(i => createValue(colorAt(val), shapeAt(i))),
                    take(3 + (val * 2)),
                    tap(observe("observable  " + val))
                )
        ),
        combineLatestAll()
    );

example$
    .subscribe(observe('example'));`
};
