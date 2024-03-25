import * as rxjs from "rxjs";
import {Observable, Subject, Subscription} from "rxjs";
import * as rxjsAjax from "rxjs/ajax";
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
    const output = ts.transpileModule(code, {
      compilerOptions: {
        module: ModuleKind.CommonJS,
        sourceMap: true
      }
    });

    const transpiledCode = output.outputText;
    const executionFunction = Function(`const exports = {}; const require = arguments[0]; ${transpiledCode}`);
    executionFunction(this.require.bind(this));
  }

  get observerAdded$(): Observable<VizualRxObserver> {
    return this._observerAdded$.asObservable();
  }

  get subscriptionCreated$(): Observable<Subscription> {
    return this.vizualRxProxies.subscriptionCreated$;
  }

  private require(moduleName: string): any {
    const rxjsProxies = this.vizualRxProxies.rxjsProxies;
    const rxjsAjaxProxies = this.vizualRxProxies.rxjsAjaxProxies;

    switch (moduleName) {
      case 'rxjs':
        return new Proxy(rxjs as any, {
          get(target, name) {
            if (name in rxjsProxies) {
              return rxjsProxies[name as string];
            } else {
              return target[name as string];
            }
          }
        });
      case 'rxjs/ajax':
        return new Proxy(rxjsAjax as any, {
          get(target, name) {
            if (name in rxjsAjaxProxies) {
              return rxjsAjaxProxies[name as string];
            } else {
              return target[name];
            }
          }
        });
      default:
        if (moduleName === 'vizual-rx') {
          return this.vizualRxApi.getExports();
        } else {
          throw 'Unknown module: ' + moduleName;
        }
    }
  }
}
