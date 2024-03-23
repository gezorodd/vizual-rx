import * as rxjs from "rxjs";
import * as rxjsAjax from "rxjs/ajax";
import {Observable, Subject, Subscription} from "rxjs";
import * as ts from "typescript";
import {ModuleKind} from "typescript";
import {VizualRxObserver} from "./vizual-rx-observer";
import {VizualRxProxies} from "./vizual-rx-proxies";
import {VizualRxApi} from "./vizual-rx-api";

export class VizualRxInterpreter {
  private readonly _observerAdded$ = new Subject<VizualRxObserver>();
  private readonly vizualRxProxies: VizualRxProxies;
  private readonly vizualRxApi: VizualRxApi;

  constructor() {
    this.vizualRxProxies = new VizualRxProxies();
    this.vizualRxApi = new VizualRxApi(this._observerAdded$);
  }

  runCode(code: string): void {
    const executionScope = this.createExecutionScope();
    const executionFunction = this.createExecutionFunction(code);
    executionFunction(executionScope);
  }

  get observerAdded$(): Observable<VizualRxObserver> {
    return this._observerAdded$.asObservable();
  }

  get subscriptionCreated$(): Observable<Subscription> {
    return this.vizualRxProxies.subscriptionCreated$;
  }

  private createExecutionScope(): any {
    return {
      modules: {
        rxjs,
        'rxjs/ajax': rxjsAjax,
        'vizual-rx': this.vizualRxApi.getExports()
      },
      vizualRxProxies: this.vizualRxProxies.rxjsProxies,
      vizualRxAjaxProxies: this.vizualRxProxies.rxjsAjaxProxies,
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
          case 'rxjs/ajax':
            return new Proxy(scope.modules['rxjs/ajax'], {
              get(target, name) {
                if (name in scope.vizualRxAjaxProxies) {
                  return scope.vizualRxAjaxProxies[name];
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
