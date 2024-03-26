import * as rxjs from "rxjs";
import {Observable, Subject, Subscription} from "rxjs";
import * as rxjsAjax from "rxjs/ajax";
import * as ts from "typescript";
import {ModuleKind} from "typescript";
import {SourceMapConsumer} from "source-map-js";
import {VizualRxObserver} from "./vizual-rx-observer";
import {VizualRxProxies} from "./vizual-rx-proxies";
import {VizualRxApi} from "./vizual-rx-api";

export class VizualRxInterpreter {
  private readonly _observerAdded$ = new Subject<VizualRxObserver>();
  private readonly vizualRxProxies: VizualRxProxies;
  private readonly vizualRxApi: VizualRxApi;

  private compilationResult?: CompilationResult;

  constructor() {
    this.vizualRxProxies = new VizualRxProxies();
    this.vizualRxApi = new VizualRxApi(this._observerAdded$);
  }

  compile(code: string): CompilationResult {
    if (this.compilationResult?.originalCode === code) {
      return this.compilationResult;
    }
    this.compilationResult = undefined;
    console.log('compiling');
    const output = ts.transpileModule(code, {
      compilerOptions: {
        module: ModuleKind.CommonJS,
        sourceMap: true
      }
    });
    const transpiledCode = output.outputText;
    const sourceMapText = output.sourceMapText;
    const sourceMapConsumer = new SourceMapConsumer(JSON.parse(sourceMapText!));
    const executionFunction = this.createExecutionFunction(transpiledCode);

    this.compilationResult = {
      originalCode: code,
      sourceMapConsumer,
      executionFunction
    };
    return this.compilationResult;
  }

  run(code: string): void {
    const compilationResult = this.compile(code);
    try {
      compilationResult.executionFunction(this.require.bind(this));
    } catch (e) {
      throw new ExecutionError(e, compilationResult.sourceMapConsumer);
    }
  }

  get observerAdded$(): Observable<VizualRxObserver> {
    return this._observerAdded$.asObservable();
  }

  get subscriptionCreated$(): Observable<Subscription> {
    return this.vizualRxProxies.subscriptionCreated$;
  }

  private createExecutionFunction(transpiledCode: string): Function {
    try {
      const fullCode = `const exports = {}; const require = arguments[0]; ${transpiledCode}`;
      return Function(fullCode);
    } catch (e) {
      throw new CompilationError(e);
    }
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
            } else if (name in target) {
              return target[name];
            } else {
              throw new ModuleImportError(moduleName, name as string);
            }
          }
        });
      case 'rxjs/ajax':
        return new Proxy(rxjsAjax as any, {
          get(target, name) {
            if (name in rxjsAjaxProxies) {
              return rxjsAjaxProxies[name as string];
            } else if (name in target) {
              return target[name];
            } else {
              throw new ModuleImportError(moduleName, name as string);
            }
          }
        });
      default:
        if (moduleName === 'vizual-rx') {
          return this.vizualRxApi.getExports();
        } else {
          throw new ModuleImportError(moduleName);
        }
    }
  }
}

export class InterpreterError extends Error {

}

export class CompilationError extends InterpreterError {
  constructor(cause: any) {
    super();
    this.cause = cause;
    this.name = cause.name ?? 'CompilationError';
    this.message = cause.message ?? 'An error occurred while compiling the code';
    this.stack = undefined;
  }
}

export class ExecutionError extends InterpreterError {

  constructor(cause: any, sourceMapConsumer: SourceMapConsumer) {
    super();
    this.cause = cause;
    this.name = cause.name ?? 'ExecutionError';
    this.message = cause.message ?? 'An error occurred while executing the code';
    this.stack = cause.stack ? ExecutionError.mapStack(cause.stack, sourceMapConsumer!) : undefined;
  }

  private static mapStack(stack: string, sourceMapConsumer: SourceMapConsumer): string {
    return stack.split('\n')
      .map(line => {
        const match = line.match(/^\s*at (\S+) .*<anonymous>:(\d+):(\d+)\)$/);
        if (match && match.length == 4) {
          const functionName = match[1];
          const line = parseInt(match[2]) - 2;
          const column = parseInt(match[3]);
          const mappedPosition = sourceMapConsumer.originalPositionFor({line, column});
          return `  at ${functionName} (${mappedPosition.line}:${mappedPosition.column})`;
        }
        return undefined;
      })
      .filter(line => !!line)
      .join('\n');
  }
}

export class ModuleImportError extends InterpreterError {
  constructor(moduleName: string, exportName?: string) {
    super();
    this.name = 'ModuleImportError';
    if (exportName) {
      this.message = `Could not find export ${exportName} in module ${moduleName}`;
    } else {
      this.message = `Could not find module with name ${moduleName}`;
    }
  }
}

interface CompilationResult {
  originalCode: string;
  executionFunction: Function;
  sourceMapConsumer: SourceMapConsumer;
}
