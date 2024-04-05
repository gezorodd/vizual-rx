import {DocPage} from "../../../doc-page.model";
import {ExpandDetailsComponent} from "./expand-details/expand-details.component";

export const expandPage: DocPage = {
  title: 'expand',
  routeUrl: 'operators/expand',
  detailsComponent: ExpandDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/expand',
  sampleCode: `import {of, expand, EMPTY, delay} from "rxjs";
import {observe} from "vizual-rx";

const example$ = of(22)
    .pipe(
        expand(value => {
            if (value === 1) {
                return EMPTY;
            } else if (value % 2) {
                return of(3 * value + 1)
                    .pipe(
                        delay(1000)
                    );
            } else {
                return of(value/2)
                    .pipe(
                        delay(500)
                    );
            }
        })
    );
example$
    .subscribe(observe('example'));`
};
