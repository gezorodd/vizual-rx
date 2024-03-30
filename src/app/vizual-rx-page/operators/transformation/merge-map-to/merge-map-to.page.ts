import {Page} from "../../../vizual-rx-page.model";
import {MergeMapToDetailsComponent} from "./merge-map-to-details/merge-map-to-details.component";

export const mergeMapToPage: Page = {
  title: 'mergeMapTo',
  routeUrl: 'operators/merge-map-to',
  detailsComponent: MergeMapToDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/mergeMapTo',
  deprecated: true,
  sampleCode: `import {mergeMapTo, timer, tap, map, take} from "rxjs";
import {observe, createValue, shapeAt, colorAt} from "vizual-rx";

const source1$ = timer(0, 2000)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(4),
        tap(observe('source1'))
    );

const source2$ = timer(0, 500)
    .pipe(
        map(i => createValue(shapeAt(i), 'yellow')),
        take(3),
        tap(observe('source2'))
    );

const example$ = source1$
    .pipe(
        mergeMapTo(source2$)
    )

example$
    .subscribe(observe('example'));`
};
