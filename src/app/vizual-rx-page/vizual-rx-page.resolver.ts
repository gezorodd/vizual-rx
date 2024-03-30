import {ResolveFn} from '@angular/router';
import {Page} from "./vizual-rx-page.model";
import {delay, forkJoin, map, Observable, Subject} from "rxjs";
import {inject, NgZone} from "@angular/core";
import {AppService} from "../app.service";
import {VizualRxPageService} from "./vizual-rx-page.service";
import {playgroundPage} from "./vizual-rx/playground/playground.page";
import {VizualRxEditorService} from "./vizual-rx-editor/vizual-rx-editor.service";
import {EditorComponent, NGX_MONACO_EDITOR_CONFIG} from "ngx-monaco-editor-v2";
import {NgxMonacoEditorConfig} from "ngx-monaco-editor-v2/lib/config";

export const vizualRxPageResolver: ResolveFn<boolean> = (route, state) => {
  const page = route.data as Page;
  const engine = inject(AppService).engine;
  const editorService = inject(VizualRxEditorService);

  const isPlayground = page.routeUrl === playgroundPage.routeUrl;
  if (isPlayground) {
    const vizualRxPageService = inject(VizualRxPageService);
    engine.prepare(vizualRxPageService.playgroundCode);
  } else {
    engine.prepare(page.sampleCode);
  }
  engine.stop();

  return forkJoin([editorService.getOrDownloadSourceAssets(), loadMonaco()])
    .pipe(
      delay(500),
      map(() => true)
    );
};


function loadMonaco(): Observable<void> {
  const config = inject(NGX_MONACO_EDITOR_CONFIG) as NgxMonacoEditorConfig;
  const zone = inject(NgZone);
  const loaded$ = new Subject<void>();

  class LoadedNotifier extends EditorComponent {
    protected override initMonaco(options: any, insideNg: boolean) {
      loaded$.next();
      loaded$.complete();
    }
  }

  const editor = new LoadedNotifier(zone, config);
  editor.ngAfterViewInit();
  return loaded$;
}

