import {DocPage} from "../../../doc-page.model";
import {OnErrorResumeNextDetailsComponent} from "./on-error-resume-next-details/on-error-resume-next-details.component";

export const onErrorResumeNextPage: DocPage = {
  title: 'onErrorResumeNext',
  routeUrl: 'operators/on-error-resume-next',
  detailsComponent: OnErrorResumeNextDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/onErrorResumeNext',
  sampleCode: `import {map, timer, take, onErrorResumeNext} from "rxjs";
import {createValue, observe, shapeAt} from "vizual-rx";

const source1$ = timer(0, 500)
    .pipe(
        map(i => {
            if (i > 3) {
                throw 'Some error happened';
            }
            return createValue('blue', shapeAt(i));
        })
    );

const source2$ = timer(0, 500)
    .pipe(
        map(i => createValue('red', shapeAt(i))),
        take(5)
    );

const example$ = onErrorResumeNext(source1$, source2$);

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));
example$
    .subscribe(observe('example'));`
};
