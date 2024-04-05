import {DocPage} from "../../../doc-page.model";
import {SampleTimeDetailsComponent} from "./sample-time-details/sample-time-details.component";

export const sampleTimePage: DocPage = {
  title: 'sampleTime',
  routeUrl: 'operators/sample-time',
  detailsComponent: SampleTimeDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/sampleTime',
  sampleCode: `import {take, tap, timer, map, sampleTime} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 600)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(10),
        tap(observe('source'))
    );

const example$ = source$
    .pipe(
        sampleTime(1500)
    )
example$
    .subscribe(observe('example'));`
};
