import {Routes} from '@angular/router';
import {VizualRxPageComponent} from "./vizual-rx-page/vizual-rx-page.component";
import {vizualRxPageResolver} from "./vizual-rx-page/vizual-rx-page.resolver";
import {pages} from "./vizual-rx-page/vizual-rx-page.data";

export const routes: Routes = pages
  .map(page => ({
    path: page.routeUrl,
    component: VizualRxPageComponent,
    data: page,
    resolve: {
      ready: vizualRxPageResolver
    }
  }));
