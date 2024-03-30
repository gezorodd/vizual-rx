import {Page} from "../../../vizual-rx-page.model";
import {SwitchMapToDetailsComponent} from "./switch-map-to-details/switch-map-to-details.component";

export const switchMapToPage: Page = {
  title: 'switchMapTo',
  routeUrl: 'operators/switch-map-to',
  detailsComponent: SwitchMapToDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/switchMapTo',
  sampleCode: `import {switchMapTo, timer, tap, map, take} from "rxjs";
import {observe, createValue, shapeAt, colorAt} from "vizual-rx";

const source1$ = timer(0, 1000)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(4),
        tap(observe('source1'))
    );

const source2$ = timer(0, 500)
    .pipe(
        map(i => createValue('yellow', shapeAt(i))),
        take(4),
        tap(observe('source2'))
    )

const example$ = source1$
    .pipe(
        switchMapTo(source2$)
    )

example$
    .subscribe(observe('example'));`
};
