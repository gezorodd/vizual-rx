import {Page} from "../page.model";
import {PlaygroundDetailsComponent} from "./playground-details/playground-details.component";

export const playgroundPage: Page = {
  title: 'Playground',
  routeUrl: 'playground',
  detailsComponent: PlaygroundDetailsComponent,
  sampleCode: `import {defaultIfEmpty, of, tap} from "rxjs";
import {createValue, observe} from "vizual-rx";

const source1$ = of()
    .pipe(
        tap(observe('source 1'))
    );

const source2$ = of(createValue('red', 'circle'))
    .pipe(
        tap(observe('source 2'))
    );

const example1$ = source1$
    .pipe(
        defaultIfEmpty(createValue('yellow', 'triangle'))
    );
example1$
    .subscribe(observe('source 1 or yellow triangle'));

const example2$ = source2$
    .pipe(
        defaultIfEmpty(createValue('yellow', 'triangle'))
    );
example2$
    .subscribe(observe('source 2 or yellow triangle'));`
};
