import {DocPage} from "../../../doc-page.model";
import {TimerDetailsComponent} from "./timer-details/timer-details.component";

export const timerPage: DocPage = {
  title: 'timer',
  routeUrl: 'operators/timer',
  detailsComponent: TimerDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/timer',
  starred: true,
  sampleCode: `import {timer, map, take} from "rxjs";
import {observe, createValue} from "vizual-rx";

const example1$ = timer(1000)
    .pipe(
        map(() => createValue('blue', 'circle'))
    );

const example2$ = timer(1000, 500)
    .pipe(
        map(() => createValue('red', 'circle')),
        take(5)
    );

example1$
    .subscribe(observe('example 1'));
example2$
    .subscribe(observe('example 2'));`
};
