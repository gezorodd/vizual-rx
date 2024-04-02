import {Page} from "../../../vizual-rx-page.model";
import {SwtchMapDetailsComponent} from "./swtch-map-details/swtch-map-details.component";

export const switchMapPage: Page = {
  title: 'switchMap',
  routeUrl: 'operators/switch-map',
  detailsComponent: SwtchMapDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/switchMap',
  starred: true,
  sampleCode: `import {switchMap, timer, tap, map, take} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 1100)
    .pipe(
        map(i => createValue(colorAt(i), 'square')),
        take(4),
        tap(observe('source'))
    );

const innerObservers = new Array(4).fill(undefined)
    .map((_, i) => observe('inner ' + i));
    console.log(innerObservers);

const example$ = source$
    .pipe(
        switchMap((value, index) => {
            const inner = timer(0, 500)
                .pipe(
                    map(() => createValue(value.color, 'circle')),
                    take(5)
                );
            inner.subscribe(innerObservers[index]);
            return inner;
        })
    )

example$
    .subscribe(observe('example'));`
};
