import {Page} from "../../../vizual-rx-page.model";
import {SwtchMapDetailsComponent} from "./swtch-map-details/swtch-map-details.component";

export const switchMapPage: Page = {
  title: 'switchMap',
  routeUrl: 'operators/switch-map',
  detailsComponent: SwtchMapDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/switchMap',
  starred: true,
  sampleCode: `import {switchMap, timer, tap, map, take} from "rxjs";
import {observe, createValue, shapeAt, colorAt} from "vizual-rx";

const source$ = timer(0, 1000)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(4),
        tap(observe('source'))
    );

const example$ = source$
    .pipe(
        switchMap(value =>
            timer(0, 500)
                .pipe(
                    map(i => createValue(value.color, shapeAt(i))),
                    take(4)
                )
        )
    )

example$
    .subscribe(observe('example'));`
};
