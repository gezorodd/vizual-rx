import {DocPage} from "../../../doc-page.model";
import {ReduceDetailsComponent} from "./reduce-details/reduce-details.component";

export const reducePage: DocPage = {
  title: 'reduce',
  routeUrl: 'operators/reduce',
  detailsComponent: ReduceDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/reduce',
  sampleCode: `import { timer, take, reduce } from 'rxjs';
import { observe } from 'vizual-rx';

const source$ = timer(0, 500)
    .pipe(
        take(5)
    );

const example$ = source$
    .pipe(
        reduce((acc, curr) => acc + curr)
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
