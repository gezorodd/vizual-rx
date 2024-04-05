import {DocPage} from "../../../doc-page.model";
import {PairwiseDetailsComponent} from "./pairwise-details/pairwise-details.component";

export const pairwisePage: DocPage = {
  title: 'pairwise',
  routeUrl: 'operators/pairwise',
  detailsComponent: PairwiseDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/pairwise',
  sampleCode: `import {pairwise, timer, map, take, tap} from "rxjs";
import {createValue, observe, shapeAt} from "vizual-rx";

const source$ = timer(0, 1000)
    .pipe(
        map(i => createValue('blue', shapeAt(i))),
        take(5),
        tap(observe("source"))
    );

const example$ = source$
    .pipe(
        pairwise()
    );

example$
    .subscribe(observe('example'));`
};
