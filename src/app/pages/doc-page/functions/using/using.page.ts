import {DocPage} from "../../doc-page.model";
import {UsingDetailsComponent} from "./using-details/using-details.component";

export const usingPage: DocPage = {
  title: 'using',
  routeUrl: 'functions/using',
  detailsComponent: UsingDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/using',
  sampleCode: `import {timer, map, using} from "rxjs";
import {observe, createValue, colorAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue('circle', colorAt(i)))
    );

const subscription = source$
    .subscribe(observe('source'));

const notifier$ = timer(2000)
    .pipe(
        map(() => createValue('purple', 'diamond'))
    );

const example$ = using(() => subscription, () => notifier$);

example$
    .subscribe(observe('example'));`
};
