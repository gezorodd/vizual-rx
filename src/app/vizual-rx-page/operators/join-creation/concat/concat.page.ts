import {Page} from "../../../vizual-rx-page.model";
import {ConcatDetailsComponent} from "./concat-details/concat-details.component";

export const concatPage: Page = {
  title: 'concat',
  routeUrl: 'operators/concat',
  detailsComponent: ConcatDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/concat',
  starred: true,
  sampleCode: `import {concat, interval, map, take, tap} from "rxjs";
import {createValue, observe} from "vizual-rx";

const source1$ = interval(500)
    .pipe(
        map(() => createValue('red')),
        take(3),
        tap(observe('source1'))
    );

const source2$ = interval(500)
    .pipe(
        map(() => createValue('blue')),
        take(2),
        tap(observe('source2'))
    );

const source3$ = interval(500)
    .pipe(
        map(() => createValue('green')),
        take(4),
        tap(observe('source3'))
    );

const example$ = concat(source1$, source2$, source3$);

example$
    .subscribe(observe('example'));`
};
