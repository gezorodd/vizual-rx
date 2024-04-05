import {DocPage} from "../../../doc-page.model";
import {SkipDetailsComponent} from "./skip-details/skip-details.component";

export const skipPage: DocPage = {
  title: 'skip',
  routeUrl: 'operators/skip',
  detailsComponent: SkipDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/skip',
  sampleCode: `import {skip, timer, map, take} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(8)
    );

const example$ = source$
    .pipe(
        skip(3)
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
