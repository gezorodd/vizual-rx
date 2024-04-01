import {Page} from "../../../vizual-rx-page.model";
import {TakeUntilDetailsComponent} from "./take-until-details/take-until-details.component";

export const takeUntilPage: Page = {
  title: 'takeUntil',
  routeUrl: 'operators/take-until',
  detailsComponent: TakeUntilDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/takeUntil',
  starred: true,
  sampleCode: `import {takeUntil, map, take, timer} from "rxjs";
import {observe, createValue, shapeAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue('blue', shapeAt(i))),
        take(8)
    );

const notifier$ = timer(2000)
    .pipe(
        map(() => createValue('green', 'circle'))
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
