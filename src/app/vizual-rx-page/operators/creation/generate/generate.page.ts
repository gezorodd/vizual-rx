import {Page} from "../../../vizual-rx-page.model";
import {GenerateDetailsComponent} from "./generate-details/generate-details.component";

export const generatePage: Page = {
  title: 'generate',
  routeUrl: 'operators/generate',
  detailsComponent: GenerateDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/generate',
  sampleCode: `import {generate, zip, map, interval} from "rxjs";
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

const example$ = zip(interval(500), source$)
    .pipe(
        map(([_, value]) => value)
    );
example$
    .subscribe(observe('example'));`
};
