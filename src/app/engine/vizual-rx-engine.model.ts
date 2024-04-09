import {Observable} from "rxjs";
import {InterpreterError} from "../core/vizual-rx-interpreter";

export interface VizualRxEngine {

  play(): void;

  pause(): void;

  stop(): void;

  replay(): void;

  now(): number;

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

  get observers$(): Observable<VizualRxObserver[]>;
}

export interface VizualRxObserver {
  readonly id: string;
  readonly label: string;

  get next$(): Observable<VizualRxNextNotification>;

  get error$(): Observable<VizualRxErrorNotification>;

  get complete$(): Observable<VizualRxNotification>;
}

export interface VizualRxNotification {
  time: number;
}

export interface VizualRxNextNotification extends VizualRxNotification {
  value: any;
}

export interface VizualRxErrorNotification extends VizualRxNotification {
  err: any;
}
