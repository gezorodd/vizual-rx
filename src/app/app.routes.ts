import {Routes} from '@angular/router';
import {VizualRxPageComponent} from "./vizual-rx-page/vizual-rx-page.component";
import {pages} from "./pages/page.data";

export const routes: Routes = pages
  .map(page => ({
    path: page.routeUrl,
    component: VizualRxPageComponent,
    data: page
  }));
