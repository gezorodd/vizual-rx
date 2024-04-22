import {InterpreterError} from "./vizual-rx-interpreter";
import {Observable} from "rxjs";

export interface VizualRxEngine {

  play(): void;

  pause(): void;

  stop(): void;

  replay(): void;

  now(): number;

  destroy(): void;

  prepare(code: string): void;

  set code(value: string);

  get code(): string;

  get starting$(): Observable<number>;

  get playing$(): Observable<boolean>;

  get playing(): boolean;

  get stopping$(): Observable<void>;

  get stopped$(): Observable<boolean>;

  set timeFactor(value: number);

  get timeFactor(): number;

  get error(): InterpreterError | undefined;

  get observers$(): Observable<VizualRxRemoteObserver[]>;

  get maxTimeFactor(): number;

  get enableInfiniteTimeFactor(): boolean;
}

export interface VizualRxRemoteObserver {
  readonly id: string;
  readonly label: string;

  get next$(): Observable<VizualRxRemoteNextNotification>;

  get error$(): Observable<VizualRxRemoteErrorNotification>;

  get complete$(): Observable<VizualRxRemoteNotification>;
}

export interface VizualRxRemoteNotification {
  time: number;
}

export interface VizualRxRemoteNextNotification extends VizualRxRemoteNotification {
  value: any;
}

export interface VizualRxRemoteErrorNotification extends VizualRxRemoteNotification {
  err: any;
}
