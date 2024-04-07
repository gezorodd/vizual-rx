import {DocPage} from "../../../doc-page.model";
import {TimeoutDetailsComponent} from "./timeout-details/timeout-details.component";

export const timeoutPage: DocPage = {
  title: 'timeout',
  routeUrl: 'operators/timeout',
  detailsComponent: TimeoutDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/timeout',
  sampleCode: `import { of, delay, timeout} from 'rxjs';
import { observe, createValue } from 'vizual-rx';

const source$ = of(createValue('blue', 'circle'))
    .pipe(
        delay(2000)
    );

const example$ = source$
    .pipe(
        timeout(1000)
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
