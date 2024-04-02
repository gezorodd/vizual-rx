import {Page} from "../../../vizual-rx-page.model";
import {SwitchAllDetailsComponent} from "./switch-all-details/switch-all-details.component";

export const switchAllPage: Page = {
  title: 'switchAll',
  routeUrl: 'operators/switch-all',
  detailsComponent: SwitchAllDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/switchAll',
  sampleCode: `import {switchAll, timer, tap, map, take} from "rxjs";
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
        map((value, index) => {
            const inner = timer(0, 500)
                .pipe(
                    map(() => createValue(value.color, 'circle')),
                    take(5)
                );
            inner.subscribe(innerObservers[index]);
            return inner;
        }),
        switchAll()
    )

example$
    .subscribe(observe('example'));`
};
