import {DocPage} from "../../../doc-page.model";
import {MapDetailsComponent} from "./map-details/map-details.component";

export const mapPage: DocPage = {
  title: 'map',
  routeUrl: 'operators/map',
  detailsComponent: MapDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/map',
  starred: true,
  sampleCode: `import {map, timer, tap, take} from "rxjs";
import {observe} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        take(8),
        tap(observe('source'))
    );

const example$ = source$
    .pipe(
        map(i => Math.pow(i, 2))
    )

example$
    .subscribe(observe('example'));`
};
