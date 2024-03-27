import {Page} from "../../../vizual-rx-page.model";
import {AjaxDetailsComponent} from "./ajax-details/ajax-details.component";

export const ajaxPage: Page = {
  title: 'ajax',
  routeUrl: 'operators/ajax',
  detailsComponent: AjaxDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/ajax/ajax',
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
