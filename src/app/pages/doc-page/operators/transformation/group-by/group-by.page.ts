import {DocPage} from "../../../doc-page.model";
import {GroupByDetailsComponent} from "./group-by-details/group-by-details.component";

export const groupByPage: DocPage = {
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
        take(10)
    );

const example$ = source$
    .pipe(
        groupBy(value => value.color),
        mergeMap(group$ =>
            group$
                .pipe(
                    reduce((acc, cur) => [...acc, cur], []),
                )
        ),
        delayWhen((_, i) => timer(i * 1000))
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
