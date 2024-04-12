import {DocPage} from "../../doc-page.model";
import {BehaviorSubjectDetailsComponent} from "./behavior-subject-details/behavior-subject-details.component";

export const behaviorSubjectPage: DocPage = {
  title: 'BehaviorSubject',
  routeUrl: 'subjects/behavior-subject',
  detailsComponent: BehaviorSubjectDetailsComponent,
  documentationUrl: 'https://rxjs.dev/guide/subject',
  sampleCode: `import { BehaviorSubject, interval, timer, take, mergeMap, tap, map } from 'rxjs';
import { observe, VizualRxValue, createValue, colorAt } from 'vizual-rx';

const initialValue = createValue('yellow', 'square');
const subject = new BehaviorSubject<VizualRxValue>(initialValue);

subject
    .subscribe(observe('observer 1'));

interval(1000)
    .pipe(take(4))
    .subscribe(i => {
        const value = createValue(colorAt(i), 'circle');
        subject.next(value);
        if (i >= 3) {
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
