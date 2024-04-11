import {DocPage} from "../../../doc-page.model";
import {MulticastDetailsComponent} from "./multicast-details/multicast-details.component";

export const multicastPage: DocPage = {
  title: 'multicast',
  routeUrl: 'operators/multicast',
  detailsComponent: MulticastDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/multicast',
  deprecated: true,
  sampleCode: `import { defer, of, multicast, Subject, timer } from 'rxjs';
import { observe, createValue } from 'vizual-rx'

const source$ = defer(() =>
    of(createValue())
);

const connectable$ = source$
    .pipe(
        multicast(new Subject())
    );

connectable$
    .subscribe(observe('observer 1'));
connectable$
    .subscribe(observe('observer 2'));
connectable$
    .subscribe(observe('observer 3'));


timer(1000)
    .subscribe(() => connectable$.connect());`
};
