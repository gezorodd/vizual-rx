import {DocPage} from "../../../doc-page.model";
import {FromDetailsComponent} from "./from-details/from-details.component";

export const fromPage: DocPage = {
  title: 'from',
  routeUrl: 'operators/from',
  detailsComponent: FromDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/from',
  starred: true,
  sampleCode: `import {from, delayWhen, timer} from "rxjs";
import {observe, createValue} from "vizual-rx";

const example1$ = from([
    createValue('red', 'circle'),
    createValue('blue', 'circle'),
    createValue('green', 'circle')
]).pipe(
    delayWhen((_, i) => timer(i * 500))
);
example1$
    .subscribe(observe('from array'));

const example2$ = from(
    new Promise(resolve => resolve(createValue('blue', 'square')))
);
example2$
    .subscribe(observe('from Promise'));

const example3$ = from('Hello')
    .pipe(
        delayWhen((_, i) => timer(i * 500))
    );
example3$
    .subscribe(observe('from string'));`
};
