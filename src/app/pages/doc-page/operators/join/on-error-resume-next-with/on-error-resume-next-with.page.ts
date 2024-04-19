import {DocPage} from "../../../doc-page.model";
import {
  OnErrorResumeNextWithDetailsComponent
} from "./on-error-resume-next-with-details/on-error-resume-next-with-details.component";

export const onErrorResumeNextWithPage: DocPage = {
  title: 'onErrorResumeNextWith',
  routeUrl: 'operators/on-error-resume-next-with',
  detailsComponent: OnErrorResumeNextWithDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/onErrorResumeNextWith',
  sampleCode: `import {map, timer, take, onErrorResumeNextWith} from "rxjs";
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

const example$ = source1$
    .pipe(
        onErrorResumeNextWith(source2$)
    )

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));
example$
    .subscribe(observe('example'));`
};
