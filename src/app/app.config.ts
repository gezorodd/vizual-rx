import {ApplicationConfig, ErrorHandler} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MonacoEditorModule} from "ngx-monaco-editor-v2";
import {provideHttpClient} from "@angular/common/http";
import {VizualRxRemoteService} from "./remote/vizual-rx-remote.service";
import {GlobalErrorHandler} from "./error/global-error-handler";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    ...MonacoEditorModule.forRoot()!.providers!,
    provideHttpClient(),
    {provide: VizualRxRemoteService, useValue: new VizualRxRemoteService()},
    {provide: ErrorHandler, useClass: GlobalErrorHandler}
  ]
};
