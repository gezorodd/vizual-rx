import {DocPage} from "../../../doc-page.model";
import {SwitchMapToDetailsComponent} from "./switch-map-to-details/switch-map-to-details.component";

export const switchMapToPage: DocPage = {
  title: 'switchMapTo',
  routeUrl: 'operators/switch-map-to',
  detailsComponent: SwitchMapToDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/switchMapTo',
  deprecated: true,
  sampleCode: `import {switchMapTo, timer, map, take} from "rxjs";
import {observe, createValue, shapeAt} from "vizual-rx";

const source1$ = timer(0, 1000)
    .pipe(
        map(i => createValue('blue', shapeAt(i))),
        take(3)
    );

const source2$ = timer(0, 500)
    .pipe(
        map(i => createValue(shapeAt(i), 'red')),
        take(4)
    );

const example$ = source1$
    .pipe(
        switchMapTo(source2$)
    );

source1$
    .subscribe(observe('source 1'));
source2$
    .subscribe(observe('source 2'));
example$
    .subscribe(observe('example'));`
};
