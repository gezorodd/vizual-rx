import {DocPage} from "../../../doc-page.model";
import {OfDetailsComponent} from "./of-details/of-details.component";

export const ofPage: DocPage = {
  title: 'of',
  routeUrl: 'operators/of',
  detailsComponent: OfDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/of',
  starred: true,
  sampleCode: `import {of} from "rxjs";
import {observe, createValue} from "vizual-rx";

const example$ = of(
    createValue('red', 'circle'),
    createValue('blue', 'circle'),
    createValue('green', 'circle')
);
example$
    .subscribe(observe('example'));`
};
