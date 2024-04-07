import {DefaultIfEmptyDetailsComponent} from "./default-if-empty-details/default-if-empty-details.component";
import {DocPage} from "../../../doc-page.model";

export const defaultIfEmptyPage: DocPage = {
  title: 'defaultIfEmpty',
  routeUrl: 'operators/default-if-empty',
  detailsComponent: DefaultIfEmptyDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/defaultIfEmpty',
  sampleCode: `import {defaultIfEmpty, timer, mergeMap, EMPTY} from "rxjs";
import {createValue, observe} from "vizual-rx";

const source$ = timer(1000)
    .pipe(
        mergeMap(() => EMPTY)
    )

const example$ = source$
    .pipe(
        defaultIfEmpty(createValue('green', 'circle'))
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
