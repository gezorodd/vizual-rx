import {AnimationFramesDetailsComponent} from "./animation-frames-details/animation-frames-details.component";
import {DocPage} from "../../doc-page.model";

export const animationFramesPage: DocPage = {
  title: 'animationFrames',
  routeUrl: 'functions/animation-frames',
  detailsComponent: AnimationFramesDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/animationFrames',
  sampleCode: `import {animationFrames, filter, map} from "rxjs";
import {observe} from "vizual-rx";

const example$ = animationFrames()
    .pipe(
        filter((_, index) => index % 100 === 0),
        map(value => Math.floor(value.elapsed / 100) / 10)
    )

example$
    .subscribe(observe('example'));`
};
