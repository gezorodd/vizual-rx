import {ResolveFn} from '@angular/router';
import {forkJoin, map, Observable, Subject} from "rxjs";
import {inject, NgZone} from "@angular/core";
import {PlayerEditorService} from "./player-editor.service";
import {EditorComponent, NGX_MONACO_EDITOR_CONFIG} from "ngx-monaco-editor-v2";
import {NgxMonacoEditorConfig} from "ngx-monaco-editor-v2/lib/config";

export const playerEditorReadyResolver: ResolveFn<boolean> = () => {
  const editorService = inject(PlayerEditorService);
  return forkJoin([editorService.getExtraLibs(), loadMonaco()])
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

