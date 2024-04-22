import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {delay, forkJoin, from, map, mergeMap, Observable, of} from "rxjs";
import {vizualRxEditorReadyResolver} from "../vizual-rx-player/vizual-rx-editor/vizual-rx-editor.resolver";
import {inject, Type} from "@angular/core";
import {ScriptService} from "../script/script.service";
import {VizualRxEngine} from "./vizual-rx-engine";
import {VizualRxScaledTimeEngine} from "./vizual-rx-scaled-time-engine";
import {VizualRxVirtualTimeEngine} from "./vizual-rx-virtual-time-engine";
import {VizualRxScaledTime} from "./vizual-rx-scaled-time";

type UnresolvedCodes = { [name: string]: ResolveFn<string> };
type ResolvedObservableCodes = { [name: string]: Observable<string> };
type ResolvedCodes = { [name: string]: string };

export const vizualRxEnginesResolver: ResolveFn<Map<string, VizualRxEngine>> = (route, state) => {
  const disableVirtualTime = route.data['disableVirtualTime'] as boolean;
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

  const resolvedObservableCodes = resolveObservableCodes(unresolvedCodes, route, state);
  const resolvedCodes$ = resolveCodes(resolvedObservableCodes);

  return editorReady$
    .pipe(
      mergeMap(() => resolvedCodes$),
      map(resolvedCodes => {
        const remotes = new Map<string, VizualRxEngine>();
        Object.keys(resolvedCodes)
          .forEach(name => {
            const code = resolvedCodes[name];
            const remote: VizualRxEngine = disableVirtualTime ? new VizualRxScaledTimeEngine() : new VizualRxVirtualTimeEngine();
            remote.prepare(code);
            remote.timeFactor = VizualRxScaledTime.defaultTimeFactor;
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
