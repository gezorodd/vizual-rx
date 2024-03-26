import {ResolveFn} from '@angular/router';
import {Page} from "../pages/page.model";
import {map, timer} from "rxjs";
import {inject} from "@angular/core";
import {AppService} from "../app.service";
import {playgroundPage} from "../pages/playground/playground.page";
import {VizualRxPageService} from "./vizual-rx-page.service";

export const vizualRxPageResolver: ResolveFn<boolean> = (route, state) => {
  const page = route.data as Page;
  const engine = inject(AppService).engine;
  const isPlayground = page.routeUrl === playgroundPage.routeUrl;
  if (isPlayground) {
    const vizualRxPageService = inject(VizualRxPageService);
    engine.prepare(vizualRxPageService.playgroundCode);
  } else {
    engine.prepare(page.sampleCode);
  }
  engine.stop();
  return timer(300)
    .pipe(
      map(() => true)
    );
};
