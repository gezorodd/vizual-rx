import {ResolveFn} from "@angular/router";
import {delay, from, map, Observable, of} from "rxjs";
import {vizualRxEditorReadyResolver} from "./vizual-rx-editor/vizual-rx-editor.resolver";
import {VizualRxCode, VizualRxCodeMap} from "./vizual-rx-player.model";
import {inject} from "@angular/core";
import {VizualRxEngine} from "../engine/vizual-rx-engine.model";
import {VizualRxEngineService} from "../engine/vizual-rx-engine.service";

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

  const codeStringMap = getCodeStringMap(codes);
  const engineService = inject(VizualRxEngineService);

  return editorReady$
    .pipe(
      map(() => {
        const engines = new Map<string, VizualRxEngine>();
        Object.keys(codeStringMap)
          .forEach(name => {
            const code = codeStringMap[name];
            const engine = engineService.createEngine();
            engine.prepare(code);
            engines.set(name, engine);
          })
        return engines;
      }),
      delay(500)
    );
};

function getCodeStringMap(vizualRxCodeMap: VizualRxCodeMap): { [name: string]: string } {
  const codeStringMap: { [name: string]: string } = {};
  Object.keys(vizualRxCodeMap)
    .forEach(name => {
      const code = vizualRxCodeMap[name];
      codeStringMap[name] = getCodeString(code);
    });
  return codeStringMap;
}

function getCodeString(vizualRxCode: VizualRxCode): string {
  if (typeof vizualRxCode === 'string') {
    return vizualRxCode;
  }
  const providerType = vizualRxCode[0];
  const providerFunction = vizualRxCode[1];

  const provider = inject(providerType);
  return providerFunction.call(provider);
}
