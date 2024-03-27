import {Page} from "../page.model";
import {FromEventDetailsComponent} from "./from-event-details/from-event-details.component";

export const fromEventPage: Page = {
  title: 'fromEvent',
  routeUrl: 'from-event',
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
