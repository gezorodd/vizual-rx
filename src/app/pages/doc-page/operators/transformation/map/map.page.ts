import {DocPage} from "../../../doc-page.model";
import {MapDetailsComponent} from "./map-details/map-details.component";

export const mapPage: DocPage = {
  title: 'map',
  routeUrl: 'operators/map',
  detailsComponent: MapDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/map',
  starred: true,
  sampleCode: `import {map, timer, take} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i), 'square')),
        take(5)
    );

const example$ = source$
    .pipe(
        map(value => createValue(value.color, 'circle'))
    )

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
