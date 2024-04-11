import {DocPage} from "../../../doc-page.model";
import {ElementAtDetailsComponent} from "./element-at-details/element-at-details.component";

export const elementAtPage: DocPage = {
  title: 'elementAt',
  routeUrl: 'operators/element-at',
  detailsComponent: ElementAtDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/elementAt',
  sampleCode: `import {elementAt, timer, map, take} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue('circle', colorAt(i))),
        take(6)
    );

const example$ = source$
    .pipe(
        elementAt(3)
    )
source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
