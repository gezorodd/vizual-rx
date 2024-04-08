import {DocPage} from "../../../doc-page.model";
import {MapToDetailsComponent} from "./map-to-details/map-to-details.component";

export const mapToPage: DocPage = {
  title: 'mapTo',
  routeUrl: 'operators/map-to',
  detailsComponent: MapToDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/mapTo',
  deprecated: true,
  sampleCode: `import {mapTo, timer, take} from "rxjs";
import {observe, createValue} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        take(5)
    );

const example$ = source$
    .pipe(
        mapTo(createValue('blue', 'circle'))
    )

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
