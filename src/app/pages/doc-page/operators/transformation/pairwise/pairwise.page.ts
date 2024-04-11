import {DocPage} from "../../../doc-page.model";
import {PairwiseDetailsComponent} from "./pairwise-details/pairwise-details.component";

export const pairwisePage: DocPage = {
  title: 'pairwise',
  routeUrl: 'operators/pairwise',
  detailsComponent: PairwiseDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/pairwise',
  sampleCode: `import {pairwise, timer, map, take} from "rxjs";
import {createValue, observe, colorAt} from "vizual-rx";

const source$ = timer(0, 1000)
    .pipe(
        map(i => createValue('circle', colorAt(i))),
        take(5)
    );

const example$ = source$
    .pipe(
        pairwise()
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
