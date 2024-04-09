import * as rxjs from "rxjs";
import {Observable, Subject, Subscription} from "rxjs";
import * as rxjsAjax from "rxjs/ajax";
import * as rxjsOperators from "rxjs/operators";
import * as ts from "typescript";
import {ModuleKind} from "typescript";
import {SourceMapConsumer} from "source-map-js";
import {VizualRxCoreObserver} from "./vizual-rx-core-observer";
import {VizualRxProxies} from "./vizual-rx-proxies";
import {VizualRxApi} from "./vizual-rx-api";
import {VizualRxScheduler} from "./vizual-rx-scheduler";

export class VizualRxInterpreter {
  private readonly _observerAdded$ = new Subject<VizualRxCoreObserver>();
  private readonly vizualRxProxies: VizualRxProxies;
  private readonly vizualRxApi: VizualRxApi;

  private compilationResult?: CompilationResult;

  constructor(scheduler: VizualRxScheduler) {
    this.vizualRxProxies = new VizualRxProxies(scheduler);
    this.vizualRxApi = new VizualRxApi(this._observerAdded$);
  }

  compile(code: string): CompilationResult {
    if (this.compilationResult?.originalCode === code) {
      return this.compilationResult;
    }
    this.compilationResult = undefined;
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

  get observerAdded$(): Observable<VizualRxCoreObserver> {
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
        return this.getModuleProxy(moduleName, rxjs as any, rxjsProxies);
      case 'rxjs/ajax':
        return this.getModuleProxy(moduleName, rxjsAjax as any, rxjsAjaxProxies);
      case 'rxjs/operators':
        return this.getModuleProxy(moduleName, rxjsOperators as any, {});
      case 'vizual-rx':
        return this.vizualRxApi.getExports();
      default:
        throw new ModuleImportError(moduleName);
    }
  }

  private getModuleProxy(moduleName: string, originalModule: any, proxiedMembers: any) {
    return new Proxy(originalModule, {
      get(target, name) {
        if (name in proxiedMembers) {
          return proxiedMembers[name as string];
        } else if (name in target) {
          return target[name];
        } else {
          throw new ModuleImportError(moduleName, name as string);
        }
      }
    });
  }
}

export abstract class InterpreterError extends Error {
  label: string;

  protected constructor(label: string) {
    super();
    this.label = label;
  }
}

export class CompilationError extends InterpreterError {
  constructor(cause: any) {
    super('Compilation Error');
    this.cause = cause;
    this.name = cause.name ?? 'CompilationError';
    this.message = cause.message ?? 'An error occurred while compiling the code';
    this.stack = undefined;
  }
}

export class ExecutionError extends InterpreterError {

  constructor(cause: any, sourceMapConsumer: SourceMapConsumer) {
    super('Execution Error');
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
    super('Module Import Error');
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
