import {Page} from "../../../vizual-rx-page.model";
import {MergeMapDetailsComponent} from "./merge-map-details/merge-map-details.component";

export const mergeMapPage: Page = {
  title: 'mergeMap',
  routeUrl: 'operators/merge-map',
  detailsComponent: MergeMapDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/mergeMap',
  starred: true,
  sampleCode: `import {mergeMap, timer, tap, map, take} from "rxjs";
import {observe, createValue, shapeAt, colorAt} from "vizual-rx";

const source$ = timer(0, 2000)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(4),
        tap(observe('source'))
    );

const example$ = source$
    .pipe(
        mergeMap(value =>
            timer(0, 500)
                .pipe(
                    map(i => createValue(value.color, shapeAt(i))),
                    take(3)
                )
        )
    )

example$
    .subscribe(observe('example'));`
};
