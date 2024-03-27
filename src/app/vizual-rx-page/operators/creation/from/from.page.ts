import {Page} from "../../../vizual-rx-page.model";
import {FromDetailsComponent} from "./from-details/from-details.component";

export const fromPage: Page = {
  title: 'from',
  routeUrl: 'operators/from',
  detailsComponent: FromDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/from',
  sampleCode: `import {from, zip, map, interval} from "rxjs";
import {observe, createValue} from "vizual-rx";

const source1$ = from([
    createValue('red', 'circle'),
    createValue('blue', 'circle'),
    createValue('green', 'circle')
]);
const example1$ = zip(interval(500), source1$)
    .pipe(
        map(([_, value]) => value)
    );
example1$
    .subscribe(observe('from array'));

const example2$ = from(
    new Promise(resolve => resolve(createValue('blue', 'square')))
);
example2$
    .subscribe(observe('from Promise'));

const example3$ = zip(interval(500), from('Hello'))
    .pipe(
        map(([_, value]) => value)
    );
example3$
    .subscribe(observe('from string'));`
};
