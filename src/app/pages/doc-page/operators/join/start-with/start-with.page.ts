import {DocPage} from "../../../doc-page.model";
import {StartWithDetailsComponent} from "./start-with-details/start-with-details.component";

export const startWithPage: DocPage = {
  title: 'startWith',
  routeUrl: 'operators/start-with',
  detailsComponent: StartWithDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/startWith',
  sampleCode: `import {startWith, interval, map, take} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = interval(500)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(4)
    );

const example$ = source$
    .pipe(
        startWith(createValue('purple', 'circle'))
    )

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
