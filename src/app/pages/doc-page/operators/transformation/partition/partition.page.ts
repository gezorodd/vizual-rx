import {DocPage} from "../../../doc-page.model";
import {PartitionDetailsComponent} from "./partition-details/partition-details.component";

export const partitionPage: DocPage = {
  title: 'partition',
  routeUrl: 'operators/partition',
  detailsComponent: PartitionDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/partition',
  deprecated: true,
  sampleCode: `import {timer, take, tap} from "rxjs";
import {partition} from "rxjs/operators";
import {observe} from "vizual-rx";

const source1$ = timer(0, 500)
    .pipe(
        take(10),
        tap(observe('source1'))
    );

const [evens$, odds$] = source1$
    .pipe(
        partition(value => value % 2 === 0)
    );

evens$
    .subscribe(observe('evens'));
odds$
    .subscribe(observe('odds'));`
};
