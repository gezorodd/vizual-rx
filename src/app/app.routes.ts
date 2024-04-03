import {Routes} from '@angular/router';
import {VizualRxPageComponent} from "./vizual-rx-page/vizual-rx-page.component";
import {pages} from "./vizual-rx-page/vizual-rx-page.data";
import {vizualRxEnginesResolver} from "./vizual-rx-player/vizual-rx-engines.resolver";
import {VizualRxPlaygroundComponent} from "./vizual-rx-playground/vizual-rx-playground.component";
import {vizualRxEditorReadyResolver} from "./vizual-rx-player/vizual-rx-editor/vizual-rx-editor.resolver";
import {VizualRxPlaygroundService} from "./vizual-rx-playground/vizual-rx-playground.service";

export const routes: Routes = [
  ...pages
    .map(page => ({
      path: page.routeUrl,
      component: VizualRxPageComponent,
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
    component: VizualRxPlaygroundComponent,
    data: {
      codes: {
        playground: [VizualRxPlaygroundService, function(this: VizualRxPlaygroundService) {return this.code}]
      }
    },
    resolve: {
      engines: vizualRxEnginesResolver
    }
  }
];
