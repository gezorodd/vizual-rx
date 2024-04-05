import {Routes} from '@angular/router';
import {vizualRxEnginesResolver} from "./vizual-rx-player/vizual-rx-engines.resolver";
import {PlaygroundPageComponent} from "./pages/playground-page/playground-page.component";
import {PlaygroundPageService} from "./pages/playground-page/playground-page.service";
import {OverviewPageComponent} from "./pages/overview-page/overview-page.component";
import {
  arrayExampleCode,
  basicExampleCode,
  colorAndShapeAtExampleCode,
  createValueExampleCode, miscExampleCode, overviewPage, pipeExampleCode
} from "./pages/overview-page/overview-page.data";
import {docPages} from "./pages/doc-page/doc-page.data";
import {DocPageComponent} from "./pages/doc-page/doc-page.component";

export const routes: Routes = [
  ...docPages
    .map(page => ({
      path: page.routeUrl,
      component: DocPageComponent,
      data: {
        page,
        codes: {
          page: page.sampleCode
        }
      },
      resolve: {
        engines: vizualRxEnginesResolver
      }
    })),
  {
    path: 'playground',
    component: PlaygroundPageComponent,
    data: {
      codes: {
        playground: [PlaygroundPageService, function (this: PlaygroundPageService) {
          return this.code
        }]
      }
    },
    resolve: {
      engines: vizualRxEnginesResolver
    }
  },
  {
    path: overviewPage.routeUrl,
    component: OverviewPageComponent,
    data: {
      codes: {
        basicExample: basicExampleCode,
        createValueExample: createValueExampleCode,
        colorAndShapeAtExample: colorAndShapeAtExampleCode,
        arrayExample: arrayExampleCode,
        miscExample: miscExampleCode,
        pipeExample: pipeExampleCode
      }
    },
    resolve: {
      engines: vizualRxEnginesResolver
    }
  },
  {
    path: '',
    redirectTo: overviewPage.routeUrl,
    pathMatch: "full"
  }
];
