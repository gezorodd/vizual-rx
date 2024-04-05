import {DocPage} from "../../../doc-page.model";
import {FromEventPatternDetailsComponent} from "./from-event-pattern-details/from-event-pattern-details.component";

export const fromEventPatternPage: DocPage = {
  title: 'fromEventPattern',
  routeUrl: 'operators/from-event-pattern',
  detailsComponent: FromEventPatternDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/fromEventPattern',
  sampleCode: `import { fromEventPattern, map } from 'rxjs';
import { observe, createValue } from 'vizual-rx';

function addClickHandler(handler) {
  document.addEventListener('click', handler);
}

function removeClickHandler(handler) {
  document.removeEventListener('click', handler);
}

const example$ = fromEventPattern(
  addClickHandler,
  removeClickHandler
);
example$
    .pipe(map(() => createValue('red', 'circle')))
    .subscribe(observe('example'));`
};
