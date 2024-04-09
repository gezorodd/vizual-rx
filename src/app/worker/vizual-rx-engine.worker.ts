/// <reference lib="webworker" />

import {
  ObserverNextMessage,
  PrepareMessage,
  SetCodeMessage,
  SetErrorMessage,
  SetObserversMessage,
  SetPlayingMessage,
  WorkerIncomingMessage,
  WorkerIncomingMessageType,
  WorkerOutgoingMessage,
  WorkerOutgoingMessageType
} from "./vizual-rx-engine-worker-messages";
import {VizualRxEngine} from "../core/vizual-rx-engine";
import {from, map, mergeMap, Subject, switchMap, takeUntil} from "rxjs";
import {InterpreterError} from "../core/vizual-rx-interpreter";
import {VizualRxObserver} from "../core/vizual-rx-observer";

const destroy$ = new Subject<void>();
const engine = new VizualRxEngine();
engine.observers$
  .pipe(takeUntil(destroy$))
  .subscribe(observers => sendSetObservers(observers));

engine.observers$
  .pipe(
    switchMap(observers => from(observers)),
    mergeMap(observer =>
      observer.next$
        .pipe(
          map(value => [value, observer])
        )
    ),
    takeUntil(destroy$)
  )
  .subscribe(([value, observer]) => sendObserverNext(observer, value));

engine.starting$
  .pipe(takeUntil(destroy$))
  .subscribe(() => sendStarting());

engine.playing$
  .pipe(takeUntil(destroy$))
  .subscribe(value => sendSetPlaying(value));

addEventListener('message', ({data}) => {
  const message = data as WorkerIncomingMessage;
  switch (message.type) {
    case WorkerIncomingMessageType.PLAY:
      processPlayMessage();
      break;
    case WorkerIncomingMessageType.PREPARE:
      processPrepareMessage(message as PrepareMessage);
      break;
    case WorkerIncomingMessageType.SET_CODE:
      processSetCodeMessage(message as SetCodeMessage);
      break;
  }
});

function processPlayMessage(): void {
  try {
    engine.play();
    sendSetError(engine.error);
  } catch (e) {
    sendSetError(engine.error);
    throw e;
  }
}

function processPrepareMessage(message: PrepareMessage): void {
  engine.prepare(message.code);
}

function processSetCodeMessage(message: SetCodeMessage): void {
  engine.code = message.value;
}

function sendSetError(error: InterpreterError | undefined): void {
  const message: SetErrorMessage = {
    type: WorkerOutgoingMessageType.SET_ERROR,
    value: error
  };
  sendMessage(message);
}

function sendSetObservers(observers: VizualRxObserver[]): void {
  const message: SetObserversMessage = {
    type: WorkerOutgoingMessageType.SET_OBSERVERS,
    values: observers.map(o => ({
      id: o.id,
      label: o.label
    }))
  };
  sendMessage(message);
}

function sendObserverNext(observer: VizualRxObserver, value: any): void {
  const message: ObserverNextMessage = {
    type: WorkerOutgoingMessageType.OBSERVER_NEXT,
    observerId: observer.id,
    value: value
  };
  sendMessage(message);
}

function sendStarting(): void {
  sendMessage({
    type: WorkerOutgoingMessageType.STARTING
  });
}

function sendSetPlaying(value: boolean): void {
  const message: SetPlayingMessage = {
    type: WorkerOutgoingMessageType.SET_PLAYING,
    value
  };
  sendMessage(message);
}

function sendMessage(message: WorkerOutgoingMessage): void {
  postMessage(message);
}
