import {DocPage} from "../../../doc-page.model";
import {SkipWhileDetailsComponent} from "./skip-while-details/skip-while-details.component";

export const skipWhilePage: DocPage = {
  title: 'skipWhile',
  routeUrl: 'operators/skip-while',
  detailsComponent: SkipWhileDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/skipWhile',
  sampleCode: `import {skipWhile, map, take, timer} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue('circle', colorAt(i))),
        take(10)
    );

const example$ = source$
    .pipe(
        skipWhile(value => value.color !== 'yellow')
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
