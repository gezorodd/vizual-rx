import {DocPage} from "../../../doc-page.model";
import {PublishDetailsComponent} from "./publish-details/publish-details.component";

export const publishPage: DocPage = {
  title: 'publish',
  routeUrl: 'operators/publish',
  detailsComponent: PublishDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/publish',
  deprecated: true,
  sampleCode: `import { defer, of, publish, merge, delay} from 'rxjs';
import { observe, createValue } from 'vizual-rx'

const source$ = defer(() =>
    of(createValue())
);

const example$ = source$
    .pipe(
        publish(multicasted$ =>
            merge(
                multicasted$.pipe(delay(500)),
                multicasted$.pipe(delay(1000)),
                multicasted$.pipe(delay(1500))
            )
        )
    );
example$
    .subscribe(observe('example'));`
};
