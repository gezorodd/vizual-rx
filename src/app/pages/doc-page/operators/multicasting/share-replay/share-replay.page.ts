import {DocPage} from "../../../doc-page.model";
import {ShareReplayDetailsComponent} from "./share-replay-details/share-replay-details.component";

export const shareReplayPage: DocPage = {
  title: 'shareReplay',
  routeUrl: 'operators/share-replay',
  detailsComponent: ShareReplayDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/shareReplay',
  sampleCode: `import { timer, map, tap, take, shareReplay, mergeMap} from 'rxjs';
import { observe, createValue } from 'vizual-rx'

const source$ = timer(0, 2000)
    .pipe(
        map(() => createValue('circle')),
        take(3),
        tap(observe('source'))
    );

const example$ = source$
    .pipe(
        shareReplay(1)
    );
example$
    .subscribe(observe('observer 1'));

timer(1000)
    .pipe(
        mergeMap(() => example$),
        tap(observe('late subscriber'))
    )
    .subscribe();`
};
