import {DocPage} from "../../../doc-page.model";
import {MaterializeDetailsComponent} from "./materialize-details/materialize-details.component";

export const materializePage: DocPage = {
  title: 'materialize',
  routeUrl: 'operators/materialize',
  detailsComponent: MaterializeDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/materialize',
  sampleCode: `import { timer, map, take, materialize} from 'rxjs';
import { observe, createValue } from 'vizual-rx';

const source$ = timer(0, 500)
    .pipe(
        map(i => {
            if (i >= 3) {
                throw 'Some error';
            } else {
                return createValue('blue', 'circle');
            }
        }),
        take(4)
    );

const example$ = source$
    .pipe(
        materialize()
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
