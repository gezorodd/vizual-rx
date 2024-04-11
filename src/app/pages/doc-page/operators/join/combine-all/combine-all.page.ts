import {CombineAllDetailsComponent} from "./combine-all-details/combine-all-details.component";
import {DocPage} from "../../../doc-page.model";

export const combineAllPage: DocPage = {
  title: 'combineAll',
  routeUrl: 'operators/combine-all',
  detailsComponent: CombineAllDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/combineAll',
  deprecated: true,
  sampleCode: `import {combineAll, timer, map, take, tap} from "rxjs";
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
        combineAll()
    );

example$
    .subscribe(observe('example'));`
};
