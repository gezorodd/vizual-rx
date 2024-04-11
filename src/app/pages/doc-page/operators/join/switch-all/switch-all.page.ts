import {DocPage} from "../../../doc-page.model";
import {SwitchAllDetailsComponent} from "./switch-all-details/switch-all-details.component";

export const switchAllPage: DocPage = {
  title: 'switchAll',
  routeUrl: 'operators/switch-all',
  detailsComponent: SwitchAllDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/switchAll',
  sampleCode: `import {switchAll, timer, tap, map, take} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 1100)
    .pipe(
        map(i => createValue(colorAt(i), 'square')),
        take(4)
    );

const example$ = source$
    .pipe(
        map((value, index) =>
            timer(0, 500)
                .pipe(
                    map(() => createValue(value.color, 'circle')),
                    take(5),
                    tap(innerObservers[index])
                )
        ),
        switchAll()
    );

source$
    .subscribe(observe('source'));

const innerObservers = new Array(4).fill(undefined)
    .map((_, i) => observe('inner ' + i));

example$
    .subscribe(observe('example'));`
};
