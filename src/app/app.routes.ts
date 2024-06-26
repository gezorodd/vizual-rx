import {Routes} from '@angular/router';
import {
  fromProvider,
  fromScriptRouteParam,
  fromValue,
  vizualRxEnginesResolver
} from "./core/vizual-rx-engines.resolver";
import {PlaygroundPageComponent} from "./pages/playground-page/playground-page.component";
import {PlaygroundPageService} from "./pages/playground-page/playground-page.service";
import {OverviewPageComponent} from "./pages/overview-page/overview-page.component";
import {
  arrayExampleCode,
  basicExampleCode,
  colorAndShapeAtExampleCode,
  createValueExampleCode,
  miscExampleCode,
  overviewPage,
  pipeExampleCode
} from "./pages/overview-page/overview-page.data";
import {docPages} from "./pages/doc-page/doc-page.data";
import {DocPageComponent} from "./pages/doc-page/doc-page.component";
import {playgroundPageData} from "./pages/playground-page/playground.page.data";
import {ErrorPageComponent} from "./pages/error-page/error-page.component";

export const routes: Routes = [
  ...docPages
    .map(page => ({
      path: page.routeUrl,
      component: DocPageComponent,
      data: {
        page,
        codes: {
          page: fromValue(page.sampleCode)
        },
        disableVirtualTime: page.disableVirtualTime,
        title: page.title
      },
      resolve: {
        engines: vizualRxEnginesResolver
      }
    })),
  {
    path: playgroundPageData.routeUrl,
    component: PlaygroundPageComponent,
    data: {
      title: 'Playground',
      codes: {
        playground: fromProvider(PlaygroundPageService, function (this: PlaygroundPageService) {
          return this.code
        })
      }
    },
    resolve: {
      engines: vizualRxEnginesResolver
    }
  },
  {
    path: `${playgroundPageData.routeUrl}/:scriptId`,
    component: PlaygroundPageComponent,
    data: {
      title: 'Playground',
      codes: {
        playground: fromScriptRouteParam('scriptId')
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
      title: 'Overview',
      codes: {
        basicExample: fromValue(basicExampleCode),
        createValueExample: fromValue(createValueExampleCode),
        colorAndShapeAtExample: fromValue(colorAndShapeAtExampleCode),
        arrayExample: fromValue(arrayExampleCode),
        miscExample: fromValue(miscExampleCode),
        pipeExample: fromValue(pipeExampleCode)
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
  },
  {
    path: 'error',
    component: ErrorPageComponent
  },
  {
    path: '**',
    component: ErrorPageComponent,
    data: {
      error: 404
    }
  },
];
