import {Routes} from '@angular/router';
import {VizualRxPageComponent} from "./vizual-rx-page/vizual-rx-page.component";
import {pages} from "./vizual-rx-page/vizual-rx-page.data";
import {vizualRxEnginesResolver} from "./vizual-rx-player/vizual-rx-engines.resolver";

export const routes: Routes = pages
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
  }));
