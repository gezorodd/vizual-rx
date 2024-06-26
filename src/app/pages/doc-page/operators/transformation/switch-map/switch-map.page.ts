import {DocPage} from "../../../doc-page.model";
import {SwtchMapDetailsComponent} from "./swtch-map-details/swtch-map-details.component";

export const switchMapPage: DocPage = {
  title: 'switchMap',
  routeUrl: 'operators/switch-map',
  detailsComponent: SwtchMapDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/switchMap',
  starred: true,
  sampleCode: `import {switchMap, timer, tap, map, take} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 1000)
    .pipe(
        map(i => createValue(colorAt(i), 'square')),
        take(4),
        tap(observe('source'))
    );
const example$ = source$
    .pipe(
        switchMap((value, index) =>
            timer(0, 500)
                .pipe(
                    map(() => createValue(value.color, 'circle')),
                    take(5),
                    tap(innerObservers[index])
                )
        )
    ),


const innerObservers = new Array(4).fill(undefined)
    .map((_, i) => observe('inner ' + i));

example$
    .subscribe(observe('example'));`
};
