import {DocPage} from "../../doc-page.model";
import {LastValueFromDetailsComponent} from "./last-value-from-details/last-value-from-details.component";

export const lastValueFromPage: DocPage = {
  title: 'lastValueFrom',
  routeUrl: 'functions/last-value-from',
  detailsComponent: LastValueFromDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/lastValueFrom',
  sampleCode: `import { interval, lastValueFrom, map, take } from 'rxjs';
import { observe, createValue, colorAt } from 'vizual-rx';

const source$ = interval(1000)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(4)
    );

const example = lastValueFrom(source$);
example.then(value => {
    observe('example').next(value);
});

source$
    .subscribe(observe('source'));`
};
