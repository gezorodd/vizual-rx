import {DocPage} from "../../doc-page.model";
import {FirstValueFromDetailsComponent} from "./first-value-from-details/first-value-from-details.component";

export const firstValueFromPage: DocPage = {
  title: 'firstValueFrom',
  routeUrl: 'functions/first-value-from',
  detailsComponent: FirstValueFromDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/firstValueFrom',
  sampleCode: `import { interval, firstValueFrom, map, take } from 'rxjs';
import { observe, createValue, colorAt } from 'vizual-rx';

const source$ = interval(1000)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(4)
    );

const example = firstValueFrom(source$);
example.then(value => {
    observe('example').next(value);
});

source$
    .subscribe(observe('source'));`
};
