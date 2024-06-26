import {DocPage} from "../../../doc-page.model";
import {EmptyDetailsComponent} from "./empty-details/empty-details.component";

export const emptyPage: DocPage = {
  title: 'empty',
  routeUrl: 'operators/empty',
  detailsComponent: EmptyDetailsComponent,
  deprecated: true,
  documentationUrl: 'https://rxjs.dev/api/index/function/empty',
  sampleCode: `import {empty} from "rxjs";
import {observe} from "vizual-rx";

const example$ = empty();
example$
    .subscribe(observe('example'));`
};
