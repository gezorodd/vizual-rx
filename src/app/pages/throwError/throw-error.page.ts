import {Page} from "../page.model";
import {ThrowErrorDetailsComponent} from "./throw-error-details/throw-error-details.component";

export const throwErrorPage: Page = {
  title: 'throwError',
  routeUrl: 'throw-error',
  detailsComponent: ThrowErrorDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/throwError',
  sampleCode: `import {throwError} from "rxjs";
import {observe} from "vizual-rx";

const example$ = throwError('Oops, something wrong happened');
example$
    .subscribe(observe('example'));`
};
