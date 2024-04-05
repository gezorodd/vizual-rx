import {DocPage} from "../../../doc-page.model";
import {SkipLastDetailsComponent} from "./skip-last-details/skip-last-details.component";

export const skipLastPage: DocPage = {
  title: 'skipLast',
  routeUrl: 'operators/skip-last',
  detailsComponent: SkipLastDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/skipLast',
  sampleCode: `import {skipLast, timer, map, take} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(8)
    );

const example$ = source$
    .pipe(
        skipLast(3)
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
