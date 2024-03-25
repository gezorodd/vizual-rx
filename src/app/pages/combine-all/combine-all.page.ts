import {CombineAllDetailsComponent} from "./combine-all-details/combine-all-details.component";
import {Page} from "../page.model";

export const combineAllPage: Page = {
  title: 'combineAll',
  routeUrl: 'combine-all',
  detailsComponent: CombineAllDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/combineAll',
  deprecated: true,
  sampleCode: `import {combineAll, timer, map, take, tap} from "rxjs";
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
        combineAll()
    );

example$
    .subscribe(observe('example'));`
};
