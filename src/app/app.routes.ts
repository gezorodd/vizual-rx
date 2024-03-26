import {Routes} from '@angular/router';
import {VizualRxPageComponent} from "./vizual-rx-page/vizual-rx-page.component";
import {pages} from "./pages/page.data";
import {vizualRxPageResolver} from "./vizual-rx-page/vizual-rx-page.resolver";

export const routes: Routes = pages
  .map(page => ({
    path: page.routeUrl,
    component: VizualRxPageComponent,
    data: page,
    resolve: {
      ready: vizualRxPageResolver
    }
  }));
