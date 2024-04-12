import {DocPage} from "../../doc-page.model";
import {ReplaySubjectDetailsComponent} from "./replay-subject-details/replay-subject-details.component";

export const replaySubjectPage: DocPage = {
  title: 'ReplaySubject',
  routeUrl: 'subjects/replay-subject',
  detailsComponent: ReplaySubjectDetailsComponent,
  documentationUrl: 'https://rxjs.dev/guide/subject',
  sampleCode: `import { ReplaySubject, interval, timer, take, mergeMap, tap, map } from 'rxjs';
import { observe, VizualRxValue, createValue, colorAt } from 'vizual-rx';

const subject = new ReplaySubject<VizualRxValue>(1);

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
