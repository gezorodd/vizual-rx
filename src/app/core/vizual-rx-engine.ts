import {InterpreterError} from "./vizual-rx-interpreter";
import {Observable} from "rxjs";

export interface VizualRxEngine {

  play(): void;

  pause(): void;

  stop(): void;

  replay(): void;

  destroy(): void;

  prepare(code: string): void;

  set code(value: string);

  get code(): string;

  get starting$(): Observable<void>;

  get playing$(): Observable<boolean>;

  get playing(): boolean;

  get stopping$(): Observable<void>;

  get stopped$(): Observable<boolean>;

  set timeFactor(value: number);

  get timeFactor(): number;

  get error(): InterpreterError | undefined;

  get animation$(): Observable<number>;

  get observers$(): Observable<VizualRxEngineObserver[]>;

  get maxTimeFactor(): number;

  get enableInfiniteTimeFactor(): boolean;
}

export interface VizualRxEngineObserver {
  readonly id: string;
  readonly label: string;

  get next$(): Observable<VizualRxEngineNextNotification>;

  get error$(): Observable<VizualRxEngineErrorNotification>;

  get complete$(): Observable<VizualRxEngineNotification>;
}

export interface VizualRxEngineNotification {
  time: number;
}

export interface VizualRxEngineNextNotification extends VizualRxEngineNotification {
  value: any;
}

export interface VizualRxEngineErrorNotification extends VizualRxEngineNotification {
  err: any;
}
