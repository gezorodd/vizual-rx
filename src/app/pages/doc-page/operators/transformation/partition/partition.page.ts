import {DocPage} from "../../../doc-page.model";
import {PartitionDetailsComponent} from "./partition-details/partition-details.component";

export const partitionPage: DocPage = {
  title: 'partition',
  routeUrl: 'operators/partition',
  detailsComponent: PartitionDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/partition',
  deprecated: true,
  sampleCode: `import {timer, map, take} from "rxjs";
import {partition} from "rxjs/operators";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i % 2), 'circle')),
        take(10)
    );

const [red$, blue$] = source$
    .pipe(
        partition(value => value.color === 'red')
    );

source$
    .subscribe(observe('source'))
red$
    .subscribe(observe('red'));
blue$
    .subscribe(observe('blue'));`
};
