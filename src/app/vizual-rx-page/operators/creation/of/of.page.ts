import {Page} from "../../../vizual-rx-page.model";
import {OfDetailsComponent} from "./of-details/of-details.component";

export const ofPage: Page = {
  title: 'of',
  routeUrl: 'of',
  detailsComponent: OfDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/of',
  sampleCode: `import {of, zip, map, interval} from "rxjs";
import {observe, createValue} from "vizual-rx";

const source$ = of(
    createValue('red', 'circle'),
    createValue('blue', 'circle'),
    createValue('green', 'circle')
);

const example$ = zip(interval(500), source$)
    .pipe(
        map(([_, value]) => value)
    );
example$
    .subscribe(observe('example'));`
};
