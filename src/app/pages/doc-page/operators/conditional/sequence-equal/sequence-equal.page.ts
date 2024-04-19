import {DocPage} from "../../../doc-page.model";
import {SequenceEqualDetailsComponent} from "./sequence-equal-details/sequence-equal-details.component";

export const sequenceEqualPage: DocPage = {
  title: 'sequenceEqual',
  routeUrl: 'operators/sequence-equal',
  detailsComponent: SequenceEqualDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/sequenceEqual',
  sampleCode: `import { timer, take, sequenceEqual } from 'rxjs';
import { observe } from 'vizual-rx';

const source1$ = timer(0, 500)
    .pipe(
        take(4)
    );

const source2$ = timer(0, 500)
    .pipe(
        take(4)
    );

const source3$ = timer(0, 500)
    .pipe(
        take(5)
    );

const example1$ = source1$
    .pipe(
        sequenceEqual(source2$)
    );
const example2$ = source1$
    .pipe(
        sequenceEqual(source3$)
    );

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));
source3$
    .subscribe(observe('source 3'));
example1$
    .subscribe(observe('source 1 sequenceEqual source 2'));
example2$
    .subscribe(observe('source 1 sequenceEqual source 3'));`
};
