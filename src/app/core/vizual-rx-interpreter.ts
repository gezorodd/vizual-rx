import * as rxjs from "rxjs";
import {Observable} from "rxjs";
import * as ts from "typescript";
import {ModuleKind} from "typescript";
import {VizualRxObservable} from "./vizual-rx-observable";
import {vizualRxProxies} from "./vizual-rx-proxies";

export class VizualRxInterpreter {

  createObservables(code: string): VizualRxObservable[] {
    const observables: VizualRxObservable[] = [];
    const executionScope = this.createExecutionScope(observables);
    const executionFunction = this.createExecutionFunction(code);
    executionFunction(executionScope);
    return observables;
  }

  private createExecutionScope(observables: VizualRxObservable[]): any {
    const vizualRxApi: VizualRxApi = {
      trackObservable(label: string, observable: Observable<any>) {
        observables.push(new VizualRxObservable(label, observable));
      }
    };
    return {
      modules: {
        rxjs,
        'vizual-rx': vizualRxApi
      },
      vizualRxProxies: vizualRxProxies
    };
  }

  private createExecutionFunction(code: string): Function {
    const transpiledCode = ts.transpile(code, {
      module: ModuleKind.CommonJS
    });

    const fullCode = `
    const require = (function() {
      const scope = arguments[0];

      return function(moduleName) {
        switch(moduleName) {
          case 'rxjs':
            return new Proxy(scope.modules.rxjs, {
              get(target, name) {
                if (name in scope.vizualRxProxies) {
                  return scope.vizualRxProxies[name];
                } else {
                  return target[name];
                }
              }
            });
          default:
            if (moduleName in scope.modules) {
              return scope.modules[moduleName];
            } else {
              throw 'Unknown module: ' + moduleName;
            }
        }
      }
    })(arguments[0]);

    const exports = arguments = {};
    ${transpiledCode}`;
    return Function(fullCode);
  }
}

interface VizualRxApi {
  trackObservable(label: string, observable: Observable<any>): void;
}
