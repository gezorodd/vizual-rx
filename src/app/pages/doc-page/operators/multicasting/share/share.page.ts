import {DocPage} from "../../../doc-page.model";
import {ShareDetailsComponent} from "./share-details/share-details.component";

export const sharePage: DocPage = {
  title: 'share',
  routeUrl: 'operators/share',
  detailsComponent: ShareDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/share',
  starred: true,
  sampleCode: `import { timer, map, tap, take, share, mergeMap} from 'rxjs';
import { observe, createValue} from 'vizual-rx'

const source$ = timer(0, 500)
    .pipe(
        map(() => createValue('circle')),
        tap(observe('source')),
        take(10)
    );

const example$ = source$
    .pipe(
        share()
    );
example$
    .subscribe(observe('observer 1'));

timer(2000)
    .pipe(
        mergeMap(() => example$),
        tap(observe('observer 2'))
    )
    .subscribe();`
};
