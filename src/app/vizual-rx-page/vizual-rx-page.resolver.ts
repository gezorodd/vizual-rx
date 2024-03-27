import {ResolveFn} from '@angular/router';
import {Page} from "./vizual-rx-page.model";
import {map, timer} from "rxjs";
import {inject} from "@angular/core";
import {AppService} from "../app.service";
import {VizualRxPageService} from "./vizual-rx-page.service";
import {playgroundPage} from "./vizual-rx/playground/playground.page";

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
