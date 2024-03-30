import {Page} from "../../../vizual-rx-page.model";
import {GroupByDetailsComponent} from "./group-by-details/group-by-details.component";

export const groupByPage: Page = {
  title: 'groupBy',
  routeUrl: 'operators/group-by',
  detailsComponent: GroupByDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/groupBy',
  sampleCode: `import {timer, delayWhen, groupBy, tap, reduce, mergeMap, take, map} from "rxjs";
import {observe, createValue, shapeAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => {
            if (i % 2) {
                return createValue('blue', shapeAt(i));
            } else {
                return createValue('red', shapeAt(i));
            }
        }),
        tap(observe('source'))
    );

const example$ = source$
    .pipe(
        take(10),
        groupBy(value => value.color),
        mergeMap(group$ =>
            group$
                .pipe(
                    tap(observe(group$.key + ' color')),
                    reduce((acc, cur) => [...acc, cur], [])
                )
        ),
        delayWhen((_, i) => timer(i * 1000))
    )

example$
    .subscribe(observe('example'));`
};
