import {Observable} from "rxjs";
import {InterpreterError} from "../core/vizual-rx-interpreter";

export interface VizualRxRemote {

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

  get observers$(): Observable<VizualRxRemoteObserver[]>;
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
