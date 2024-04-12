import {SubjectDetailsComponent} from "./subject-details/subject-details.component";
import {DocPage} from "../../doc-page.model";

export const subjectPage: DocPage = {
  title: 'Subject',
  routeUrl: 'subjects/subject',
  detailsComponent: SubjectDetailsComponent,
  documentationUrl: 'https://rxjs.dev/guide/subject',
  sampleCode: `import { Subject, interval, timer, take, mergeMap, tap, map } from 'rxjs';
import { observe, VizualRxValue, createValue, colorAt } from 'vizual-rx';

const subject = new Subject<VizualRxValue>();

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
