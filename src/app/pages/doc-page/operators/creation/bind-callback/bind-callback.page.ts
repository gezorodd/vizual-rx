import {DocPage} from "../../../doc-page.model";
import {BindCallbackDetailsComponent} from "./bind-callback-details/bind-callback-details.component";

export const bindCallbackPage: DocPage = {
  title: 'bindCallback',
  routeUrl: 'function/bind-callback',
  detailsComponent: BindCallbackDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/function/bindCallback',
  sampleCode: `import { bindCallback } from 'rxjs';
import { observe, createValue } from 'vizual-rx';

function someFunction(color, shape, cb){
    const value = createValue(shape, color);
    cb(value);
}

const boundSomeFunction = bindCallback(someFunction);

const example$ = boundSomeFunction('green', 'circle')
example$
    .subscribe(observe('example'));`
};
