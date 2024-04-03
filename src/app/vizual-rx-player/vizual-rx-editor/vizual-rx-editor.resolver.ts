import {ResolveFn} from '@angular/router';
import {forkJoin, map, Observable, Subject} from "rxjs";
import {inject, NgZone} from "@angular/core";
import {VizualRxEditorService} from "./vizual-rx-editor.service";
import {EditorComponent, NGX_MONACO_EDITOR_CONFIG} from "ngx-monaco-editor-v2";
import {NgxMonacoEditorConfig} from "ngx-monaco-editor-v2/lib/config";

export const vizualRxEditorReadyResolver: ResolveFn<boolean> = () => {
  const editorService = inject(VizualRxEditorService);
  return forkJoin([editorService.getOrDownloadSourceAssets(), loadMonaco()])
    .pipe(
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

