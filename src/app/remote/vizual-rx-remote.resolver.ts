import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {delay, forkJoin, from, map, mergeMap, Observable, of} from "rxjs";
import {vizualRxEditorReadyResolver} from "../vizual-rx-player/vizual-rx-editor/vizual-rx-editor.resolver";
import {inject, Type} from "@angular/core";
import {VizualRxRemote} from "./vizual-rx-remote.model";
import {VizualRxRemoteService} from "./vizual-rx-remote.service";
import {ScriptService} from "../script/script.service";

type UnresolvedCodes = { [name: string]: ResolveFn<string> };
type ResolvedObservableCodes = { [name: string]: Observable<string> };
type ResolvedCodes = { [name: string]: string };

export const vizualRxRemoteResolver: ResolveFn<Map<string, VizualRxRemote>> = (route, state) => {
  const disableWebWorker = route.data['disableWebWorker'] as boolean;
  const unresolvedCodes = route.data['codes'] as UnresolvedCodes;
  if (!unresolvedCodes || Object.keys(unresolvedCodes).length === 0) {
    return of(new Map());
  }

  let editorReady$: Observable<boolean>;
  const editorReady = vizualRxEditorReadyResolver(route, state);
  if (typeof (editorReady) === 'boolean') {
    editorReady$ = of(editorReady);
  } else {
    editorReady$ = from(editorReady);
  }

  const remoteService = inject(VizualRxRemoteService);
  const resolvedObservableCodes = resolveObservableCodes(unresolvedCodes, route, state);
  const resolvedCodes$ = resolveCodes(resolvedObservableCodes);

  return editorReady$
    .pipe(
      mergeMap(() => resolvedCodes$),
      map(resolvedCodes => {
        const remotes = new Map<string, VizualRxRemote>();
        Object.keys(resolvedCodes)
          .forEach(name => {
            const code = resolvedCodes[name];
            const remote = remoteService.createRemote(disableWebWorker);
            remote.prepare(code);
            remote.timeFactor = remoteService.defaultTimeFactor;
            remotes.set(name, remote);
          })
        return remotes;
      }),
      delay(200)
    );
};

function resolveObservableCodes(unresolvedCodes: UnresolvedCodes, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ResolvedObservableCodes {
  const resolvedObservableCodes: ResolvedObservableCodes = {};
  Object.keys(unresolvedCodes)
    .forEach(name => {
      const resolveFn = unresolvedCodes[name];
      const resolved = resolveFn(route, state);
      let resolved$: Observable<string>;
      if (typeof resolved === 'string') {
        resolved$ = of(resolved);
      } else {
        resolved$ = from(resolved);
      }
      resolvedObservableCodes[name] = resolved$;
    });
  return resolvedObservableCodes;
}

function resolveCodes(resolvedObservableCodes: ResolvedObservableCodes): Observable<ResolvedCodes> {
  const nameCodesObservables: Observable<[string, string]>[] = [];
  Object.keys(resolvedObservableCodes)
    .forEach(name => {
      const code$ = resolvedObservableCodes[name];
      const nameCode$ = code$
        .pipe(
          map(code => [name, code] as [string, string])
        );
      nameCodesObservables.push(nameCode$);
    });
  return forkJoin(nameCodesObservables)
    .pipe(
      map(nameCodes => {
        const resolvedCodes: ResolvedCodes = {};
        nameCodes
          .forEach(([name, code]) => resolvedCodes[name] = code);
        return resolvedCodes;
      })
    );
}

export function fromValue(code: string): ResolveFn<string> {
  return () => code;
}

export function fromProvider<T>(providerType: Type<T>, providerFunction: (this: T) => string): ResolveFn<string> {
  return () => {
    const provider = inject(providerType);
    return providerFunction.call(provider);
  };
}

export function fromScriptRouteParam(scriptIdParamName: string): ResolveFn<string> {
  return (route: ActivatedRouteSnapshot) => {
    const scriptService = inject(ScriptService);
    const scriptId = route.params[scriptIdParamName];
    return scriptService.getScript(scriptId)
      .pipe(
        map(script => script.content)
      );
  };
}
