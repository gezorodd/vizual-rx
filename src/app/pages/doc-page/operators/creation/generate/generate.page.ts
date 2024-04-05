import {DocPage} from "../../../doc-page.model";
import {GenerateDetailsComponent} from "./generate-details/generate-details.component";

export const generatePage: DocPage = {
  title: 'generate',
  routeUrl: 'operators/generate',
  detailsComponent: GenerateDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/generate',
  sampleCode: `import {generate, delayWhen, timer} from "rxjs";
import {observe} from "vizual-rx";

const source$ = generate(
    45,
    n => n != 1,
    n => {
        if (n % 2 == 0) {
            return n / 2;
        } else {
            return n * 3 + 1;
        }
    }
);

const example$ = source$
    .pipe(
        delayWhen((_, i) => timer(i * 500))
    );
example$
    .subscribe(observe('example'));`
};
