import {Page} from "../../../vizual-rx-page.model";
import {ZipDetailsComponent} from "./zip-details/zip-details.component";

export const zipPage: Page = {
  title: 'zip',
  routeUrl: 'operators/zip',
  detailsComponent: ZipDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/zip',
  sampleCode: `import {zip, interval, map, take, tap, timer} from "rxjs";
import {createValue, observe, shapeAt} from "vizual-rx";

const source1$ = interval(2000)
    .pipe(
        take(3),
        map(i => createValue('red', shapeAt(i))),
        tap(observe("source 1"))
    );

const source2$ = interval(500)
    .pipe(
        map(i => createValue('blue', shapeAt(i))),
        tap(observe("source 2"))
    );

const source3$ = timer(3000, 2000)
    .pipe(
        map(i => createValue('green', shapeAt(i))),
        tap(observe("source 3"))
    );

const example$ = zip(source1$, source2$, source3$);

example$
    .subscribe(observe('example'));`
};
