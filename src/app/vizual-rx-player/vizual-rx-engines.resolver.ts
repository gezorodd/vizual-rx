import {ResolveFn} from "@angular/router";
import {VizualRxEngine} from "../core/vizual-rx-engine";
import {delay, from, map, Observable, of} from "rxjs";
import {vizualRxEditorReadyResolver} from "../vizual-rx-editor/vizual-rx-editor.resolver";
import {VizualRxCodeMap} from "./vizual-rx-player.model";

export const vizualRxEnginesResolver: ResolveFn<Map<string, VizualRxEngine>> = (route, state) => {
  const codes = route.data['codes'] as VizualRxCodeMap;
  if (!codes || Object.keys(codes).length === 0) {
    return of(new Map());
  }

  let editorReady$: Observable<boolean>;
  const editorReady = vizualRxEditorReadyResolver(route, state);
  if (typeof (editorReady) === 'boolean') {
    editorReady$ = of(editorReady);
  } else {
    editorReady$ = from(editorReady);
  }

  return editorReady$
    .pipe(
      map(() => {
        const engines = new Map<string, VizualRxEngine>();
        Object.keys(codes)
          .forEach(name => {
            const code = codes[name];
            const codeValue = typeof code === 'string' ? code : code();
            const engine = new VizualRxEngine();
            engine.prepare(codeValue);
            engines.set(name, engine);
          })
        return engines;
      }),
      delay(500)
    );
};
