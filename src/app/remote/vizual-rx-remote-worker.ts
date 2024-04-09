// import {BehaviorSubject, NEVER, Observable, Subject} from "rxjs";
// import {InterpreterError} from "../core/vizual-rx-interpreter";
// import {VizualRxCoreObserver} from "../core/vizual-rx-core-observer";
// import {VizualRxScheduler} from "../core/vizual-rx-scheduler";
// import {VizualRxEngine} from "./vizual-rx-engine.model";
// import {
//   ObserverNextMessage,
//   PrepareMessage,
//   SetCodeMessage,
//   SetErrorMessage,
//   SetObserversMessage,
//   SetPlayingMessage,
//   WorkerIncomingMessage,
//   WorkerIncomingMessageType,
//   WorkerOutgoingMessage,
//   WorkerOutgoingMessageType
// } from "../worker/vizual-rx-engine-worker-messages";
// import {VizualRxTime} from "../core/vizual-rx-time";
//
// export class VizualRxWorkerEngineClient implements VizualRxEngine {
//   readonly scheduler: VizualRxScheduler;
//
//   private readonly worker: Worker;
//   private readonly time: VizualRxTime;
//   private readonly _observers$: BehaviorSubject<VizualRxCoreObserver[]>;
//   private readonly observersByRemoteId: Map<string, VizualRxCoreObserver>;
//   private readonly _starting$: Subject<void>;
//   private readonly _playing$: BehaviorSubject<boolean>;
//
//   private _code: string;
//   private _error: InterpreterError | undefined;
//   private _timeFactor: number;
//
//   constructor() {
//     this.worker = new Worker(new URL('../worker/vizual-rx-engine.worker', import.meta.url));
//     this.worker.onmessage = ({data}) => this.processMessage(data);
//
//     this.time = new VizualRxTime();
//     this.scheduler = new VizualRxScheduler(this.time);
//     this._observers$ = new BehaviorSubject<VizualRxCoreObserver[]>([]);
//     this.observersByRemoteId = new Map<string, VizualRxCoreObserver>();
//     this._starting$ = new Subject<void>();
//     this._playing$ = new BehaviorSubject<boolean>(false);
//
//     this._code = '';
//     this._timeFactor = 1;
//   }
//
//   play(): void {
//     const message: WorkerIncomingMessage = {
//       type: WorkerIncomingMessageType.PLAY
//     };
//     this.sendMessage(message);
//   }
//
//   pause(): void {
//     // TODO
//   }
//
//   stop(): void {
//     // TODO
//   }
//
//   replay(): void {
//     // TODO
//   }
//
//   destroy(): void {
//     // TODO
//   }
//
//   prepare(code: string): void {
//     this._code = code;
//     const message: PrepareMessage = {
//       type: WorkerIncomingMessageType.PREPARE,
//       code
//     };
//     this.sendMessage(message);
//   }
//
//   get stopping$(): Observable<void> {
//     // TODO
//     return NEVER;
//   }
//
//   get starting$(): Observable<void> {
//     return this._starting$.asObservable();
//   }
//
//   get stopped$(): Observable<boolean> {
//     // TODO
//     return NEVER;
//   }
//
//   get playing$(): Observable<boolean> {
//     return this._playing$.asObservable();
//   }
//
//   get playing(): boolean {
//     return this._playing$.value;
//   }
//
//   set timeFactor(value: number) {
//     // TODO
//     this._timeFactor = value;
//   }
//
//   get timeFactor(): number {
//     // TODO
//     return this._timeFactor;
//   }
//
//   set code(value: string) {
//     this._code = value;
//     const message: SetCodeMessage = {
//       type: WorkerIncomingMessageType.SET_CODE,
//       value
//     };
//     this.sendMessage(message);
//   }
//
//   get code(): string {
//     return this._code;
//   }
//
//   get error(): InterpreterError | undefined {
//     return this._error;
//   }
//
//   get observers$(): Observable<VizualRxCoreObserver[]> {
//     return this._observers$.asObservable();
//   }
//
//   private sendMessage(message: WorkerIncomingMessage) {
//     this.worker.postMessage(message);
//   }
//
//   private processMessage(message: WorkerOutgoingMessage): void {
//     switch (message.type) {
//       case WorkerOutgoingMessageType.SET_ERROR:
//         this.processSetErrorMessage(message as SetErrorMessage);
//         break;
//       case WorkerOutgoingMessageType.SET_OBSERVERS:
//         this.processSetObserversMessage(message as SetObserversMessage);
//         break;
//       case WorkerOutgoingMessageType.OBSERVER_NEXT:
//         this.processObserverNext(message as ObserverNextMessage);
//         break;
//       case WorkerOutgoingMessageType.STARTING:
//         this.processStarting();
//         break;
//       case WorkerOutgoingMessageType.SET_PLAYING:
//         this.processSetPlaying(message as SetPlayingMessage);
//     }
//   }
//
//   private processSetErrorMessage(message: SetErrorMessage): void {
//     this._error = message.value;
//   }
//
//   private processSetObserversMessage(message: SetObserversMessage): void {
//     const remoteObservers = message.values;
//
//     // TODO
//     // remoteObservers
//     //   .filter(remoteObservers => !this.observersByRemoteId.has(remoteObservers.id))
//     //   .forEach(newObserverInfo => {
//     //     const observer = new VizualRxCoreObserver(newObserverInfo.label);
//     //     this.observersByRemoteId.set(newObserverInfo.id, observer);
//     //   });
//
//     [...this.observersByRemoteId.keys()]
//       .filter(remoteId => !remoteObservers.find(o => o.id === remoteId))
//       .forEach(removedRemoteId => this.observersByRemoteId.delete(removedRemoteId));
//
//     this._observers$.next([...this.observersByRemoteId.values()]);
//   }
//
//   private processObserverNext(message: ObserverNextMessage): void {
//     const observer = this.observersByRemoteId.get(message.observerId);
//     if (observer) {
//       observer.next(message.value);
//     }
//   }
//
//   private processStarting(): void {
//     this._starting$.next(undefined);
//   }
//
//   private processSetPlaying(message: SetPlayingMessage): void {
//     this._playing$.next(message.value);
//   }
// }
