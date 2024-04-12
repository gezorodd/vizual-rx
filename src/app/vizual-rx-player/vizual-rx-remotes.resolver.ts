import {ResolveFn} from "@angular/router";
import {delay, from, map, Observable, of} from "rxjs";
import {vizualRxEditorReadyResolver} from "./vizual-rx-editor/vizual-rx-editor.resolver";
import {VizualRxCode, VizualRxCodeMap} from "./vizual-rx-player.model";
import {inject} from "@angular/core";
import {VizualRxRemote} from "../remote/vizual-rx-remote.model";
import {VizualRxRemoteService} from "../remote/vizual-rx-remote.service";

export const vizualRxRemotesResolver: ResolveFn<Map<string, VizualRxRemote>> = (route, state) => {
  const disableWebWorker = route.data['disableWebWorker'] as boolean;
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
  const remoteService = inject(VizualRxRemoteService);

  return editorReady$
    .pipe(
      map(() => {
        const remotes = new Map<string, VizualRxRemote>();
        Object.keys(codeStringMap)
          .forEach(name => {
            const code = codeStringMap[name];
            const remote = remoteService.createRemote(disableWebWorker);
            remote.prepare(code);
            remotes.set(name, remote);
          })
        return remotes;
      }),
      delay(200)
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
