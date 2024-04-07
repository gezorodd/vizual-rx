import {DocPage} from "../../../doc-page.model";
import {IsEmptyDetailsComponent} from "./is-empty-details/is-empty-details.component";

export const isEmptyPage: DocPage = {
  title: 'isEmpty',
  routeUrl: 'operators/is-empty',
  detailsComponent: IsEmptyDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/isEmpty',
  sampleCode: `import {isEmpty, timer, mergeMap, EMPTY} from "rxjs";
import {observe} from "vizual-rx";

const source$ = timer(1000)
    .pipe(
        mergeMap(() => EMPTY)
    )

const example$ = source$
    .pipe(
        isEmpty()
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
