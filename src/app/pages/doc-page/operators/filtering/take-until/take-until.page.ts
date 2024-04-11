import {DocPage} from "../../../doc-page.model";
import {TakeUntilDetailsComponent} from "./take-until-details/take-until-details.component";

export const takeUntilPage: DocPage = {
  title: 'takeUntil',
  routeUrl: 'operators/take-until',
  detailsComponent: TakeUntilDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/takeUntil',
  starred: true,
  sampleCode: `import {takeUntil, map, take, timer} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue('circle', colorAt(i % 5))),
        take(8)
    );

const notifier$ = timer(2000)
    .pipe(
        map(() => createValue('square', 'purple'))
    );

source$
    .subscribe(observe('source'));
notifier$
    .subscribe(observe('notifier'));

const example$ = source$
    .pipe(
        takeUntil(notifier$)
    );
example$
    .subscribe(observe('example'));`
};
