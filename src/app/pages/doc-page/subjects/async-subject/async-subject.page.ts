import {DocPage} from "../../doc-page.model";
import {AsyncSubjectDetailsComponent} from "./async-subject-details/async-subject-details.component";

export const asyncSubjectPage: DocPage = {
  title: 'AsyncSubject',
  routeUrl: 'subjects/async-subject',
  detailsComponent: AsyncSubjectDetailsComponent,
  documentationUrl: 'https://rxjs.dev/guide/subject',
  sampleCode: `import { AsyncSubject, interval, timer, take, mergeMap, tap, map } from 'rxjs';
import { observe, VizualRxValue, createValue, colorAt } from 'vizual-rx';

const subject = new AsyncSubject<VizualRxValue>();

subject
    .subscribe(observe('observer 1'));

interval(1000)
    .pipe(take(5))
    .subscribe(i => {
        const value = createValue(colorAt(i), 'circle');
        subject.next(value);
        if (i >= 4) {
            subject.complete();
        }
    });

timer(2500)
    .pipe(
        map(() => createValue('purple', 'diamond')),
        tap(observe('observer 2 subscription')),
        mergeMap(() => subject)
    )
    .subscribe(observe('observer 2'));`
};
