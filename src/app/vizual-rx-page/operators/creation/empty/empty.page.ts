import {Page} from "../../../vizual-rx-page.model";
import {EmptyDetailsComponent} from "./empty-details/empty-details.component";

export const emptyPage: Page = {
  title: 'empty',
  routeUrl: 'empty',
  detailsComponent: EmptyDetailsComponent,
  deprecated: true,
  documentationUrl: 'https://rxjs.dev/api/index/function/empty',
  sampleCode: `import {empty} from "rxjs";
import {observe} from "vizual-rx";

const example$ = empty();
example$
    .subscribe(observe('example'));`
};
