import {Page} from "../../../vizual-rx-page.model";
import {MapToDetailsComponent} from "./map-to-details/map-to-details.component";

export const mapToPage: Page = {
  title: 'mapTo',
  routeUrl: 'operators/map-to',
  detailsComponent: MapToDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/mapTo',
  deprecated: true,
  sampleCode: `import {mapTo, timer, tap, take} from "rxjs";
import {observe, createValue} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        take(8),
        tap(observe('source'))
    );

const example$ = source$
    .pipe(
        mapTo(createValue('blue', 'circle'))
    )

example$
    .subscribe(observe('example'));`
};
