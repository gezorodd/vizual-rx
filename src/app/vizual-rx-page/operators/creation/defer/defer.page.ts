import {Page} from "../../../vizual-rx-page.model";
import {DeferDetailsComponent} from "./defer-details/defer-details.component";

export const deferPage: Page = {
  title: 'defer',
  routeUrl: 'defer',
  detailsComponent: DeferDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/defer',
  sampleCode: `import { interval, take, defer, of, mergeMap } from 'rxjs';
import {observe } from "vizual-rx";

const source$ = defer(() => of(new Date().getMilliseconds()));

const example$ = interval(500)
    .pipe(
        mergeMap(() => source$),
        take(5)
    );

example$
    .subscribe(observe('example'));`
};
