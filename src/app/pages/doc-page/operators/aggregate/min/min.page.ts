import {DocPage} from "../../../doc-page.model";
import {MinDetailsComponent} from "./min-details/min-details.component";

export const minPage: DocPage = {
  title: 'min',
  routeUrl: 'operators/min',
  detailsComponent: MinDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/operators/min',
  sampleCode: `import { timer, map, take, min, share } from 'rxjs';
import { observe } from 'vizual-rx';

const source$ = timer(0, 500)
    .pipe(
        map(() => Math.floor(Math.random() * 100)),
        take(5),
        share()
    );

const example$ = source$
    .pipe(
        min()
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
