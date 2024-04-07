import {DocPage} from "../../../doc-page.model";
import {PublishReplayDetailsComponent} from "./publish-replay-details/publish-replay-details.component";

export const publishReplayPage: DocPage = {
  title: 'publishReplay',
  routeUrl: 'operators/publish-replay',
  detailsComponent: PublishReplayDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/publishReplay',
  deprecated: true,
  sampleCode: `import { defer, of, publishReplay} from 'rxjs';
import { observe, createValue } from 'vizual-rx'

const source$ = defer(() =>
    of(createValue())
);

const connectable$ = source$
    .pipe(
        publishReplay()
    );
connectable$
    .subscribe(observe('observer 1'));
connectable$
    .subscribe(observe('observer 2'));

connectable$.connect();

connectable$
    .subscribe(observe('late subscriber'));`
};
