import {Page} from "../../../vizual-rx-page.model";
import {FromEventDetailsComponent} from "./from-event-details/from-event-details.component";

export const fromEventPage: Page = {
  title: 'fromEvent',
  routeUrl: 'operators/from-event',
  detailsComponent: FromEventDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/fromEvent',
  sampleCode: `import {fromEvent, mapTo} from 'rxjs';
import {observe, createValue} from "vizual-rx";

const example$ = fromEvent(document, 'click')
    .pipe(
        mapTo(createValue('blue', 'circle'))
    );
example$
    .subscribe(observe('example'));`
};
