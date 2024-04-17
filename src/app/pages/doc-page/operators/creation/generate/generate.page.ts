import {DocPage} from "../../../doc-page.model";
import {GenerateDetailsComponent} from "./generate-details/generate-details.component";

export const generatePage: DocPage = {
  title: 'generate',
  routeUrl: 'operators/generate',
  detailsComponent: GenerateDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/generate',
  sampleCode: `import {generate} from "rxjs";
import {observe} from "vizual-rx";

const example$ = generate({
    initialState: 1,
    condition: num => num < 1000,
    iterate: num => num * 10
});

example$
    .subscribe(observe('example'));`
};
