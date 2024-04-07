import {DocPage} from "../../../doc-page.model";
import {MaxDetailsComponent} from "./max-details/max-details.component";

export const maxPage: DocPage = {
  title: 'max',
  routeUrl: 'operators/max',
  detailsComponent: MaxDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/max',
  sampleCode: `import { timer, map, take, max, share } from 'rxjs';
import { observe } from 'vizual-rx';

const source$ = timer(0, 500)
    .pipe(
        map(() => Math.floor(Math.random() * 100)),
        take(5),
        share()
    );

const example$ = source$
    .pipe(
        max()
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
