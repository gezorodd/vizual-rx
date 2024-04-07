import {DocPage} from "../../../doc-page.model";
import {DematerializeDetailsComponent} from "./dematerialize-details/dematerialize-details.component";

export const dematerializePage: DocPage = {
  title: 'dematerialize',
  routeUrl: 'operators/dematerialize',
  detailsComponent: DematerializeDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/dematerialize',
  sampleCode: `import { timer, map, take, dematerialize, NextNotification, ErrorNotification} from 'rxjs';
import { observe, createValue } from 'vizual-rx';

const source$ = timer(0, 500)
    .pipe(
        map(i => {
            if (i >= 3) {
                const value: ErrorNotification = {
                    kind: 'E',
                    error: 'Some error'
                };
                return value;
            } else {
                const value: NextNotification<any> = {
                    kind: 'N',
                    value: createValue('blue', 'circle')
                };
                return value;
            }
        }),
        take(4)
    );

const example$ = source$
    .pipe(
        dematerialize()
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
