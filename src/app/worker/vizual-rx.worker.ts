/// <reference lib="webworker" />

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
} from "./vizual-rx-messages";
import {VizualRxEngine} from "../core/vizual-rx-engine";
import {distinct, from, map, merge, mergeMap, Observable, Subject, switchMap, takeUntil, tap} from "rxjs";
import {InterpreterError} from "../core/vizual-rx-interpreter";
import {VizualRxValue} from "../core/vizual-rx-value";

class VizualRxWorker {
  private readonly engine = new VizualRxEngine();
  private readonly destroy$ = new Subject<void>();

  constructor() {
    merge(
      this.sendStartingFromEngine(),
      this.sendPlayingFromEngine(),
      this.sendStoppingFromEngine(),
      this.sendStoppedFromEngine(),
      this.sendObserversFromEngine(),
      this.sendObserverNextFromEngine(),
      this.sendObserverErrorFromEngine(),
      this.sendObserverCompleteFromEngine(),
      this.sendTimeFactorFromEngine()
    ).subscribe();
  }

  processMessage(message: WorkerIncomingMessage): void {
    switch (message.type) {
      case WorkerIncomingMessageType.PLAY:
        this.processPlayMessage();
        break;
      case WorkerIncomingMessageType.PAUSE:
        this.processPauseMessage();
        break;
      case WorkerIncomingMessageType.STOP:
        this.processStopMessage();
        break;
      case WorkerIncomingMessageType.REPLAY:
        this.processReplayMessage();
        break;
      case WorkerIncomingMessageType.DESTROY:
        this.processDestroyMessage();
        break;
      case WorkerIncomingMessageType.PREPARE:
        this.processPrepareMessage(message as PrepareMessage);
        break;
      case WorkerIncomingMessageType.SET_CODE:
        this.processSetCodeMessage(message as SetCodeMessage);
        break;
      case WorkerIncomingMessageType.SET_TIME_FACTOR:
        this.processSetTimeFactorMessage(message as SetTimeFactorMessage);
        break;
    }
  }

  private processPlayMessage(): void {
    try {
      this.engine.play();
    } finally {
      this.sendSetError(this.engine.error);
    }
  }

  private processPauseMessage() {
    this.engine.pause();
  }

  private processStopMessage() {
    this.engine.stop();
  }

  private processReplayMessage() {
    try {
      this.engine.replay();
    } finally {
      this.sendSetError(this.engine.error);
    }
  }

  private processDestroyMessage() {
    this.destroy$.next();
    this.destroy$.complete();
    self.close();
  }

  private processPrepareMessage(message: PrepareMessage): void {
    this.engine.prepare(message.code);
  }

  private processSetCodeMessage(message: SetCodeMessage): void {
    this.engine.code = message.value;
  }

  private processSetTimeFactorMessage(message: SetTimeFactorMessage): void {
    this.engine.timeFactor = message.value;
  }

  private sendStartingFromEngine(): Observable<unknown> {
    return this.engine.starting$
      .pipe(
        tap(() => {
          const message: StartingMessage = {
            type: WorkerOutgoingMessageType.STARTING,
            time: this.engine.time.virtualNow()
          }
          this.sendMessage(message);
        }),
        takeUntil(this.destroy$)
      );
  }

  private sendPlayingFromEngine(): Observable<unknown> {
    return this.engine.playing$
      .pipe(
        tap(value => {
          const message: SetPlayingMessage = {
            type: WorkerOutgoingMessageType.SET_PLAYING,
            value
          };
          this.sendMessage(message);
        }),
        takeUntil(this.destroy$)
      );
  }

  private sendStoppingFromEngine(): Observable<unknown> {
    return this.engine.stopping$
      .pipe(
        tap(() =>
          this.sendMessage({
            type: WorkerOutgoingMessageType.STOPPING
          })
        ),
        takeUntil(this.destroy$)
      );
  }

  private sendStoppedFromEngine(): Observable<unknown> {
    return this.engine.stopped$
      .pipe(
        tap(value => {
          const message: SetStoppedMessage = {
            type: WorkerOutgoingMessageType.SET_STOPPED,
            value
          };
          this.sendMessage(message);
        }),
        takeUntil(this.destroy$)
      );
  }

  private sendTimeFactorFromEngine(): Observable<unknown> {
    return this.engine.time.timeFactor$
      .pipe(
        tap(() => {
          const message: SyncTimeMessage = {
            type: WorkerOutgoingMessageType.SYNC_TIME,
            value: this.engine.time.data
          };
          this.sendMessage(message);
        }),
        takeUntil(this.destroy$)
      );
  }

  private sendObserversFromEngine(): Observable<unknown> {
    return this.engine.observers$
      .pipe(
        tap(observers => {
          const message: SetObserversMessage = {
            type: WorkerOutgoingMessageType.SET_OBSERVERS,
            values: observers.map(o => ({
              id: o.id,
              label: o.label
            }))
          };
          this.sendMessage(message);
        }),
        takeUntil(this.destroy$)
      );
  }

  private sendObserverNextFromEngine(): Observable<unknown> {
    return this.engine.observers$
      .pipe(
        switchMap(observers => from(observers)),
        distinct(),
        mergeMap(observer =>
          observer.next$
            .pipe(
              map(value => [value, observer])
            )
        ),
        tap(([value, observer]) => {
          const message: ObserverNextMessage = {
            type: WorkerOutgoingMessageType.OBSERVER_NEXT,
            observerId: observer.id,
            time: this.engine.scheduler.now(),
            value: this.serializeValue(value)
          };
          this.sendMessage(message);
        }),
        takeUntil(this.destroy$)
      );
  }

  private sendObserverErrorFromEngine(): Observable<unknown> {
    return this.engine.observers$
      .pipe(
        switchMap(observers => from(observers)),
        distinct(),
        mergeMap(observer =>
          observer.error$
            .pipe(
              map(err => [err, observer])
            )
        ),
        tap(([err, observer]) => {
          const message: ObserverErrorMessage = {
            type: WorkerOutgoingMessageType.OBSERVER_ERROR,
            observerId: observer.id,
            time: this.engine.scheduler.now(),
            err: typeof(err) === 'object' ? err.toString() : err
          };
          this.sendMessage(message);
        }),
        takeUntil(this.destroy$)
      );
  }

  private sendObserverCompleteFromEngine(): Observable<unknown> {
    return this.engine.observers$
      .pipe(
        switchMap(observers => from(observers)),
        distinct(),
        mergeMap(observer =>
          observer.complete$
            .pipe(
              map(() => observer)
            )
        ),
        tap((observer) => {
          const message: ObserverCompleteMessage = {
            type: WorkerOutgoingMessageType.OBSERVER_COMPLETE,
            observerId: observer.id,
            time: this.engine.scheduler.now()
          };
          this.sendMessage(message);
        }),
        takeUntil(this.destroy$)
      );
  }

  private sendSetError(error: InterpreterError | undefined): void {
    const message: SetErrorMessage = {
      type: WorkerOutgoingMessageType.SET_ERROR,
      value: error
    };
    this.sendMessage(message);
  }

  private sendMessage(message: WorkerOutgoingMessage): void {
    postMessage(message);
  }

  private serializeValue(value: any): any {
    if (Array.isArray(value)) {
      return value
        .map(item => this.serializeValue(item));
    }
    if (value instanceof VizualRxValue) {
      return {...value, isVizualRxValue: true};
    }
    return value;
  }
}

const worker = new VizualRxWorker();

self.addEventListener('message', ({data}) => {
  const message = data as WorkerIncomingMessage;
  worker.processMessage(message);
});
