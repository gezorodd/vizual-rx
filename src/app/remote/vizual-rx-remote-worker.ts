import {BehaviorSubject, Observable, Subject} from "rxjs";
import {InterpreterError} from "../core/vizual-rx-interpreter";
import {
  ObserverCompleteMessage,
  ObserverErrorMessage,
  ObserverNextMessage,
  PrepareMessage,
  SetCodeMessage,
  SetErrorMessage,
  SetObserversMessage,
  SetPlayingMessage,
  SetStoppedMessage,
  SetTimeFactorMessage,
  StartingMessage,
  SyncTimeMessage,
  WorkerIncomingMessage,
  WorkerIncomingMessageType,
  WorkerOutgoingMessage,
  WorkerOutgoingMessageType
} from "../worker/vizual-rx-messages";
import {VizualRxTime} from "../core/vizual-rx-time";
import {
  VizualRxRemote,
  VizualRxRemoteErrorNotification,
  VizualRxRemoteNextNotification,
  VizualRxRemoteNotification,
  VizualRxRemoteObserver
} from "./vizual-rx-remote.model";
import {VizualRxValue} from "../core/vizual-rx-value";

export class VizualRxRemoteWorker implements VizualRxRemote {
  private readonly worker: Worker;
  private readonly time: VizualRxTime;
  private readonly _observers$: BehaviorSubject<VizualRxRemoteObserver[]>;
  private readonly observersById: Map<string, VizualRxObserverAdapter>;
  private readonly _starting$: Subject<number>;
  private readonly _stopping$: Subject<void>;
  private readonly _playing$: BehaviorSubject<boolean>;
  private readonly _stopped$: BehaviorSubject<boolean>;

  private _code: string;
  private _error: InterpreterError | undefined;
  private _timeFactor: number;

  constructor() {
    this.worker = new Worker(new URL('../worker/vizual-rx.worker', import.meta.url));
    this.worker.onmessage = ({data}) => this.processMessage(data);

    this.time = new VizualRxTime();
    this._observers$ = new BehaviorSubject<VizualRxRemoteObserver[]>([]);
    this.observersById = new Map<string, VizualRxObserverAdapter>();
    this._starting$ = new Subject<number>();
    this._stopping$ = new Subject<void>();
    this._playing$ = new BehaviorSubject<boolean>(false);
    this._stopped$ = new BehaviorSubject<boolean>(true);

    this._code = '';
    this._timeFactor = 1;
  }

  play(): void {
    const message: WorkerIncomingMessage = {
      type: WorkerIncomingMessageType.PLAY
    };
    this.sendMessage(message);
  }

  pause(): void {
    const message: WorkerIncomingMessage = {
      type: WorkerIncomingMessageType.PAUSE
    };
    this.sendMessage(message);
  }

  stop(): void {
    const message: WorkerIncomingMessage = {
      type: WorkerIncomingMessageType.STOP
    };
    this.sendMessage(message);
  }

  replay(): void {
    const message: WorkerIncomingMessage = {
      type: WorkerIncomingMessageType.REPLAY
    };
    this.sendMessage(message);
  }

  now(): number {
    return this.time.virtualNow();
  }

  destroy(): void {
    const message: WorkerIncomingMessage = {
      type: WorkerIncomingMessageType.DESTROY
    };
    this.sendMessage(message);
  }

  prepare(code: string): void {
    this._code = code;
    const message: PrepareMessage = {
      type: WorkerIncomingMessageType.PREPARE,
      code
    };
    this.sendMessage(message);
  }

  get starting$(): Observable<number> {
    return this._starting$.asObservable();
  }

  get playing$(): Observable<boolean> {
    return this._playing$.asObservable();
  }

  get playing(): boolean {
    return this._playing$.value;
  }

  get stopping$(): Observable<void> {
    return this._stopping$.asObservable();
  }

  get stopped$(): Observable<boolean> {
    return this._stopped$;
  }

  set timeFactor(value: number) {
    this._timeFactor = value;
    const message: SetTimeFactorMessage = {
      type: WorkerIncomingMessageType.SET_TIME_FACTOR,
      value
    };
    this.sendMessage(message);
  }

  get timeFactor(): number {
    return this._timeFactor;
  }

  set code(value: string) {
    this._code = value;
    const message: SetCodeMessage = {
      type: WorkerIncomingMessageType.SET_CODE,
      value
    };
    this.sendMessage(message);
  }

  get code(): string {
    return this._code;
  }

  get error(): InterpreterError | undefined {
    return this._error;
  }

  get observers$(): Observable<VizualRxRemoteObserver[]> {
    return this._observers$.asObservable();
  }

  private sendMessage(message: WorkerIncomingMessage) {
    this.worker.postMessage(message);
  }

  private processMessage(message: WorkerOutgoingMessage): void {
    switch (message.type) {
      case WorkerOutgoingMessageType.STARTING:
        this.processStartingMessage(message as StartingMessage);
        break;
      case WorkerOutgoingMessageType.SET_PLAYING:
        this.processSetPlayingMessage(message as SetPlayingMessage);
        break;
      case WorkerOutgoingMessageType.STOPPING:
        this.processStoppingMessage();
        break;
      case WorkerOutgoingMessageType.SET_STOPPED:
        this.processSetStoppedMessage(message as SetStoppedMessage);
        break;
      case WorkerOutgoingMessageType.SYNC_TIME:
        this.processSyncTimeMessage(message as SyncTimeMessage);
        break;
      case WorkerOutgoingMessageType.SET_OBSERVERS:
        this.processSetObserversMessage(message as SetObserversMessage);
        break;
      case WorkerOutgoingMessageType.OBSERVER_NEXT:
        this.processObserverNextMessage(message as ObserverNextMessage);
        break;
      case WorkerOutgoingMessageType.OBSERVER_ERROR:
        this.processObserverErrorMessage(message as ObserverErrorMessage);
        break;
      case WorkerOutgoingMessageType.OBSERVER_COMPLETE:
        this.processObserverCompleteMessage(message as ObserverCompleteMessage);
        break;
      case WorkerOutgoingMessageType.SET_ERROR:
        this.processSetErrorMessage(message as SetErrorMessage);
        break;
    }
  }

  private processStartingMessage(message: StartingMessage): void {
    this._starting$.next(message.time);
  }

  private processSetPlayingMessage(message: SetPlayingMessage): void {
    this._playing$.next(message.value);
  }

  private processStoppingMessage(): void {
    this._stopping$.next(undefined);
  }

  private processSetStoppedMessage(message: SetStoppedMessage): void {
    this._stopped$.next(message.value);
  }

  private processSyncTimeMessage(message: SyncTimeMessage): void {
    this.time.data = message.value;
  }

  private processSetObserversMessage(message: SetObserversMessage): void {
    const observerInfos = message.values;

    observerInfos
      .filter(observerInfo => !this.observersById.has(observerInfo.id))
      .forEach(newObserverInfo => {
        const observer = new VizualRxObserverAdapter(newObserverInfo.id, newObserverInfo.label);
        this.observersById.set(newObserverInfo.id, observer);
      });

    [...this.observersById.keys()]
      .filter(id => !observerInfos.find(o => o.id === id))
      .forEach(removedId => this.observersById.delete(removedId));

    this._observers$.next([...this.observersById.values()]);
  }

  private processObserverNextMessage(message: ObserverNextMessage): void {
    const observer = this.observersById.get(message.observerId);
    if (observer) {
      observer.next(message);
    }
  }

  private processObserverErrorMessage(message: ObserverErrorMessage): void {
    const observer = this.observersById.get(message.observerId);
    if (observer) {
      observer.error(message);
    }
  }

  private processObserverCompleteMessage(message: ObserverCompleteMessage): void {
    const observer = this.observersById.get(message.observerId);
    if (observer) {
      observer.complete(message);
    }
  }

  private processSetErrorMessage(message: SetErrorMessage): void {
    this._error = message.value;
  }
}

// TODO handle error and complete
class VizualRxObserverAdapter implements VizualRxRemoteObserver {
  readonly id: string;
  readonly label: string;

  private readonly _next$: Subject<VizualRxRemoteNextNotification>;
  private readonly _error$: Subject<VizualRxRemoteErrorNotification>;
  private readonly _complete$: Subject<VizualRxRemoteNotification>;

  constructor(id: string, label: string) {
    this.id = id;
    this.label = label;
    this._next$ = new Subject();
    this._error$ = new Subject();
    this._complete$ = new Subject();
  }

  next(message: ObserverNextMessage): void {
    this._next$.next({
      time: message.time,
      value: this.deserializeValue(message.value)
    });
  }

  error(message: ObserverErrorMessage): void {
    this._error$.next({
      time: message.time,
      err: message.err
    });
  }

  complete(message: ObserverCompleteMessage): void {
    this._complete$.next({
      time: message.time
    });
  }

  get next$(): Observable<VizualRxRemoteNextNotification> {
    return this._next$.asObservable();
  }

  get error$(): Observable<VizualRxRemoteErrorNotification> {
    return this._error$.asObservable();
  }

  get complete$(): Observable<VizualRxRemoteNotification> {
    return this._complete$.asObservable();
  }

  private deserializeValue(value: any): any {
    if (Array.isArray(value)) {
      return value
        .map(item => this.deserializeValue(item));
    }
    if (value['isVizualRxValue']) {
      return new VizualRxValue(value['color'], value['shape']);
    }
    return value;
  }
}
