import {DocPage} from "../../../doc-page.model";
import {FromDetailsComponent} from "./from-details/from-details.component";

export const fromPage: DocPage = {
  title: 'from',
  routeUrl: 'operators/from',
  detailsComponent: FromDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/from',
  starred: true,
  sampleCode: `import {from} from "rxjs";
import {observe, createValue} from "vizual-rx";

const example1$ = from([
    createValue('red', 'circle'),
    createValue('blue', 'circle'),
    createValue('green', 'circle')
]);

const example2$ = from(
    new Promise(resolve => resolve(createValue('blue', 'square')))
);

const example3$ = from('Hello');

example1$
    .subscribe(observe('from array'));
example2$
    .subscribe(observe('from Promise'));
example3$
    .subscribe(observe('from string'));`
};
