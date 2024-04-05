import {DocPage} from "../../../doc-page.model";
import {TakeWhileDetailsComponent} from "./take-while-details/take-while-details.component";

export const takeWhilePage: DocPage = {
  title: 'takeWhile',
  routeUrl: 'operators/take-while',
  detailsComponent: TakeWhileDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/takeWhile',
  sampleCode: `import {takeWhile, map, take, timer} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue('circle', colorAt(i % 4))),
        take(10)
    );

const example$ = source$
    .pipe(
        takeWhile(value => value.color !== 'orange')
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
