import {DocPage} from "../../../doc-page.model";
import {TimerDetailsComponent} from "./timer-details/timer-details.component";

export const timerPage: DocPage = {
  title: 'timer',
  routeUrl: 'operators/timer',
  detailsComponent: TimerDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/timer',
  starred: true,
  sampleCode: `import {timer, mapTo, take} from "rxjs";
import {observe, createValue} from "vizual-rx";

const example1$ = timer(1000)
    .pipe(
        mapTo(createValue('blue', 'circle'))
    );
example1$
    .subscribe(observe('example 1'));

const example2$ = timer(1000, 500)
    .pipe(
        mapTo(createValue('red', 'circle')),
        take(5)
    );
example2$
    .subscribe(observe('example 2'));`
};