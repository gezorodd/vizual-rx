import {Page} from "../../../vizual-rx-page.model";
import {PartitionDetailsComponent} from "./partition-details/partition-details.component";

export const partitionPage: Page = {
  title: 'partition',
  routeUrl: 'functions/partition',
  detailsComponent: PartitionDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/partition',
  sampleCode: `import {partition, timer, take, tap} from "rxjs";
import {observe} from "vizual-rx";

const source1$ = timer(0, 500)
    .pipe(
        take(10),
        tap(observe('source1'))
    );

const [evens$, odds$] = partition(source1$, value => value % 2 === 0);

evens$
    .subscribe(observe('evens'));
odds$
    .subscribe(observe('odds'));`
};
