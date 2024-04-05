import {DocPage} from "../../../doc-page.model";
import {BindNodeCallbackDetailsComponent} from "./bind-node-callback-details/bind-node-callback-details.component";

export const bindNodeCallbackPage: DocPage = {
  title: 'bindNodeCallback',
  routeUrl: 'operators/bind-node-callback',
  detailsComponent: BindNodeCallbackDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/bindNodeCallback',
  sampleCode: `import { bindNodeCallback } from 'rxjs';
import { observe, createValue } from 'vizual-rx';

function someFunction(color, shape, cb){
    if (shape !== 'circle') {
        cb('Invalid shape');
    } else {
        const value = createValue(shape, color);
        cb(null, value);
    }
}

const boundSomeFunction = bindNodeCallback(someFunction);

const example1$ = boundSomeFunction('green', 'circle')
example1$
    .subscribe(observe('example1'));

const example2$ = boundSomeFunction('green', 'square')
example2$
    .subscribe(observe('example2'));`
};
