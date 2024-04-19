import {DocPage} from "../../../doc-page.model";
import {EndWithDetailsComponent} from "./end-with-details/end-with-details.component";

export const endWithPage: DocPage = {
  title: 'endWith',
  routeUrl: 'operators/end-with',
  detailsComponent: EndWithDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/endWith',
  sampleCode: `import {endWith, timer, map, take} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(4)
    );

const example$ = source$
    .pipe(
        endWith(createValue('purple', 'circle'))
    )

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
