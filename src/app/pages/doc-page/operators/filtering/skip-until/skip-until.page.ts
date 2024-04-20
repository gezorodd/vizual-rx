import {DocPage} from "../../../doc-page.model";
import {SkipUntilDetailsComponent} from "./skip-until-details/skip-until-details.component";

export const skipUntilPage: DocPage = {
  title: 'skipUntil',
  routeUrl: 'operators/skip-until',
  detailsComponent: SkipUntilDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/skipUntil',
  sampleCode: `import {skipUntil, map, take, timer} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue('circle', colorAt(i))),
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
        skipUntil(notifier$)
    );
example$
    .subscribe(observe('example'));`
};
