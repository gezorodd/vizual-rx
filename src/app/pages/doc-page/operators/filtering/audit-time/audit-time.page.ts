import {DocPage} from "../../../doc-page.model";
import {AuditTimeDetailsComponent} from "./audit-time-details/audit-time-details.component";

export const auditTimePage: DocPage = {
  title: 'auditTime',
  routeUrl: 'operators/audit-time',
  detailsComponent: AuditTimeDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/auditTime',
  sampleCode: `import {auditTime, timer, map, take} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 600)
    .pipe(
        map(i => createValue('circle', colorAt(i))),
        take(10)
    );

const example$ = source$
    .pipe(
        auditTime(1000)
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
