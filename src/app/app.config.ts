import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MonacoEditorModule} from "ngx-monaco-editor-v2";
import {provideHttpClient} from "@angular/common/http";
import {VizualRxEngineService} from "./engine/vizual-rx-engine.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    ...MonacoEditorModule.forRoot()!.providers!,
    provideHttpClient(),
    {provide: VizualRxEngineService, useValue: new VizualRxEngineService(false)}
  ]
};
