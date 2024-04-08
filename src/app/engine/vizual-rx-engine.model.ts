import {Observable} from "rxjs";
import {VizualRxObserver} from "../core/vizual-rx-observer";
import {InterpreterError} from "../core/vizual-rx-interpreter";
import {VizualRxScheduler} from "../core/vizual-rx-scheduler";

export interface VizualRxEngine {

  play(): void;

  pause(): void;

  stop(): void;

  replay(): void;

  destroy(): void;

  prepare(code: string): void;

  get stopping$(): Observable<void>;

  get starting$(): Observable<void>;

  get stopped$(): Observable<boolean>;

  get playing$(): Observable<boolean>;

  get playing(): boolean;

  set timeFactor(value: number);

  get timeFactor(): number;

  set code(value: string);

  get code(): string;

  get error(): InterpreterError | undefined;

  get observers(): Observable<VizualRxObserver[]>;

  get scheduler(): VizualRxScheduler;
}
