import {DocPage} from "../../../doc-page.model";
import {ConnectableDetailsComponent} from "./connectable-details/connectable-details.component";

export const connectablePage: DocPage = {
  title: 'connectable',
  routeUrl: 'operators/connectable',
  detailsComponent: ConnectableDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/connectable',
  sampleCode: `import { defer, of, connectable} from 'rxjs';
import { observe, createValue} from 'vizual-rx'

const source$ = defer(() =>
    of(createValue())
);

const connectable$ = connectable(source$);

connectable$
    .subscribe(observe('observer 1'));
connectable$
    .subscribe(observe('observer 2'));

connectable$.connect();`
};
