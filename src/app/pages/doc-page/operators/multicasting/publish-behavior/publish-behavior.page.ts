import {DocPage} from "../../../doc-page.model";
import {PublishBehaviorDetailsComponent} from "./publish-behavior-details/publish-behavior-details.component";

export const publishBehaviorPage: DocPage = {
  title: 'publishBehavior',
  routeUrl: 'operators/publish-behavior',
  detailsComponent: PublishBehaviorDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/publishBehavior',
  deprecated: true,
  sampleCode: `import { interval, map, tap, take, publishBehavior} from 'rxjs';
import { observe, createValue } from 'vizual-rx'

const source$ = interval(500)
    .pipe(
        map(() => createValue('circle')),
        tap(observe('source')),
        take(5)
    );

const connectable$ = source$
    .pipe(
        publishBehavior(createValue('purple', 'square'))
    );
connectable$
    .subscribe(observe('observer 1'));
connectable$
    .subscribe(observe('observer 2'));
connectable$
    .subscribe(observe('observer 3'));

connectable$.connect();`
};
