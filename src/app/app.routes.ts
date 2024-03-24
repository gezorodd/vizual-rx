import {Routes} from '@angular/router';
import {VizualRxPageComponent} from "./vizual-rx-page/vizual-rx-page.component";
import {combineLatest} from "./vizual-rx-page/combine-latest/combine-latest.data";
import {combineAll} from "./vizual-rx-page/combine-all/combine-all.data";

export const routes: Routes = [
  {path: 'combine-all', component: VizualRxPageComponent, data: combineAll},
  {path: 'combine-latest', component: VizualRxPageComponent, data: combineLatest},
];
