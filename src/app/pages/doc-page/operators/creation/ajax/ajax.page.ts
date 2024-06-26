import {DocPage} from "../../../doc-page.model";
import {AjaxDetailsComponent} from "./ajax-details/ajax-details.component";

export const ajaxPage: DocPage = {
  title: 'ajax',
  routeUrl: 'operators/ajax',
  detailsComponent: AjaxDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/ajax/ajax',
  disableVirtualTime: true,
  sampleCode: `import {ajax} from "rxjs/ajax";
import {map} from "rxjs";
import {observe} from "vizual-rx";

const example$ = ajax('https://api.github.com/users?per_page=5')
    .pipe(
        map(ajaxResponse => ajaxResponse.response[0].login)
    );

example$
    .subscribe(observe('example'));`
};
