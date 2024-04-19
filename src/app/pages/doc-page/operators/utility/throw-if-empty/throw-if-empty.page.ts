import {DocPage} from "../../../doc-page.model";
import {ThrowIfEmptyDetailsComponent} from "./throw-if-empty-details/throw-if-empty-details.component";

export const throwIfEmptyPage: DocPage = {
  title: 'throwIfEmpty',
  routeUrl: 'operators/throw-if-empty',
  detailsComponent: ThrowIfEmptyDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/throwIfEmpty',
  sampleCode: `import { timer, takeUntil, throwIfEmpty } from 'rxjs';
import { observe } from 'vizual-rx';

const source$ = timer(2000)
    .pipe(
        takeUntil(timer(1000))
    );
const example$ = source$
    .pipe(
        throwIfEmpty()
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
