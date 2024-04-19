import {DocPage} from "../../../doc-page.model";
import {NeverDetailsComponent} from "./never-details/never-details.component";

export const neverPage: DocPage = {
  title: 'never',
  routeUrl: 'operators/never',
  detailsComponent: NeverDetailsComponent,
  deprecated: true,
  documentationUrl: 'https://rxjs.dev/api/index/function/never',
  sampleCode: `import {never} from "rxjs";
import {observe} from "vizual-rx";

const example$ = never();
example$
    .subscribe(observe('example'));`
};
