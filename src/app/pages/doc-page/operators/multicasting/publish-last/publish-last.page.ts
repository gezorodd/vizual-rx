import {DocPage} from "../../../doc-page.model";
import {PublishLastDetailsComponent} from "./publish-last-details/publish-last-details.component";

export const publishLastPage: DocPage = {
  title: 'publishLast',
  routeUrl: 'operators/publish-last',
  detailsComponent: PublishLastDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/publishLast',
  deprecated: true,
  sampleCode: `import { timer, map, tap, publishLast, take} from 'rxjs';
import { observe, createValue } from 'vizual-rx'

const source$ = timer(0, 500)
    .pipe(
        map(() => createValue()),
        tap(observe('source')),
        take(5)
    );

const connectable$ = source$
    .pipe(
        publishLast()
    );
connectable$
    .subscribe(observe('observer 1'));
connectable$
    .subscribe(observe('observer 2'));
connectable$
    .subscribe(observe('observer 3'));

connectable$.connect();`
};
