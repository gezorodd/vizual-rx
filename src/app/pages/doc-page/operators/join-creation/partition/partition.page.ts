import {DocPage} from "../../../doc-page.model";
import {PartitionDetailsComponent} from "./partition-details/partition-details.component";

export const partitionPage: DocPage = {
  title: 'partition',
  routeUrl: 'functions/partition',
  detailsComponent: PartitionDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/partition',
  sampleCode: `import {partition, timer, map, take} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i % 2), 'circle')),
        take(10)
    );

const [red$, blue$] = partition(source$, value => value.color === 'red');

source$
    .subscribe(observe('source'))
red$
    .subscribe(observe('red'));
blue$
    .subscribe(observe('blue'));`
};
