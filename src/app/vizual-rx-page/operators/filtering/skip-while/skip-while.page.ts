import {Page} from "../../../vizual-rx-page.model";
import {SkipWhileDetailsComponent} from "./skip-while-details/skip-while-details.component";

export const skipWhilePage: Page = {
  title: 'skipWhile',
  routeUrl: 'operators/skip-while',
  detailsComponent: SkipWhileDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/skipWhile',
  sampleCode: `import {skipWhile, map, take, timer} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue('circle', colorAt(i % 4))),
        take(10)
    );

const example$ = source$
    .pipe(
        skipWhile(value => value.color !== 'orange')
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
