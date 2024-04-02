import {Page} from "../../../vizual-rx-page.model";
import {StartWithDetailsComponent} from "./start-with-details/start-with-details.component";

export const startWithPage: Page = {
  title: 'startWith',
  routeUrl: 'operators/start-with',
  detailsComponent: StartWithDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/startWith',
  sampleCode: `import {startWith, interval, tap, map, take} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = interval(500)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(4),
        tap(observe('source'))
    );

const example$ = source$
    .pipe(
        startWith(createValue('purple', 'circle'))
    )

example$
    .subscribe(observe('example'));`
};
