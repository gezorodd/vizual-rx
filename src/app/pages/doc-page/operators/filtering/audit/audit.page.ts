import {DocPage} from "../../../doc-page.model";
import {AuditDetailsComponent} from "./audit-details/audit-details.component";

export const auditPage: DocPage = {
  title: 'audit',
  routeUrl: 'operators/audit',
  detailsComponent: AuditDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/audit',
  sampleCode: `import {take, timer, map, audit} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 600)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(15)
    );

const example$ = source$
    .pipe(
        audit(value => timer(value.color === 'yellow' ? 2000 : 1000))
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
