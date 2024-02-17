import * as rxjs from "rxjs";
import {Observable, Observer, Subject, Subscription} from "rxjs";
import * as ts from "typescript";
import {ModuleKind} from "typescript";
import {VizualRxObserver} from "./vizual-rx-observer";
import {VizualRxProxies} from "./vizual-rx-proxies";

export class VizualRxInterpreter {
  private readonly _observerAdded$ = new Subject<VizualRxObserver>();
  private vizualRxProxies: VizualRxProxies;

  constructor() {
    this.vizualRxProxies = new VizualRxProxies();
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
    const self = this;
    const vizualRxApi: VizualRxApi = {
      observe(name?: string): Observer<any> {
        const observer = new VizualRxObserver(name ?? '');
        self._observerAdded$.next(observer);
        return observer;
      }
    };
    return {
      modules: {
        rxjs,
        'vizual-rx': vizualRxApi
      },
      vizualRxProxies: this.vizualRxProxies.rxjsProxies
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
  observe(name?: string): Observer<any>;
}
