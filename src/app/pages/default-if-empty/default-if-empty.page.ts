import {DefaultIfEmptyDetailsComponent} from "./default-if-empty-details/default-if-empty-details.component";
import {Page} from "../page.model";

export const defaultIfEmptyPage: Page = {
  title: 'defaultIfEmpty',
  routeUrl: 'default-if-empty',
  detailsComponent: DefaultIfEmptyDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/defaultIfEmpty',
  sampleCode: `import {defaultIfEmpty, of, tap} from "rxjs";
import {createValue, observe} from "vizual-rx";

const source1$ = of()
    .pipe(
        tap(observe('source 1'))
    );

const source2$ = of(createValue('red', 'circle'))
    .pipe(
        tap(observe('source 2'))
    );

const example1$ = source1$
    .pipe(
        defaultIfEmpty(createValue('yellow', 'triangle'))
    );
example1$
    .subscribe(observe('source 1 or yellow triangle'));

const example2$ = source2$
    .pipe(
        defaultIfEmpty(createValue('yellow', 'triangle'))
    );
example2$
    .subscribe(observe('source 2 or yellow triangle'));`
};
