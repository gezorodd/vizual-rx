import {InterpreterError} from "../core/vizual-rx-interpreter";

export interface WorkerMessage<TYPE> {
  type: TYPE;
}

////////////
// INCOMING
////////////

export enum WorkerIncomingMessageType {
  PLAY,
  PREPARE,
  SET_CODE
}

export interface WorkerIncomingMessage extends WorkerMessage<WorkerIncomingMessageType> {
}

export interface PrepareMessage extends WorkerIncomingMessage {
  type: WorkerIncomingMessageType.PREPARE,
  code: string;
}

export interface SetCodeMessage extends WorkerIncomingMessage {
  type: WorkerIncomingMessageType.SET_CODE,
  value: string;
}


////////////
// OUTGOING
////////////

export enum WorkerOutgoingMessageType {
  SET_ERROR,
  SET_OBSERVERS,
  OBSERVER_NEXT,
  STARTING,
  SET_PLAYING
}

export interface WorkerOutgoingMessage extends WorkerMessage<WorkerOutgoingMessageType> {

}

export interface SetErrorMessage extends WorkerOutgoingMessage {
  type: WorkerOutgoingMessageType.SET_ERROR,
  value: InterpreterError | undefined
}

export interface SetObserversMessage extends WorkerOutgoingMessage {
  type: WorkerOutgoingMessageType.SET_OBSERVERS;
  values: ObserverInfo[];
}

export interface ObserverInfo {
  id: string;
  label: string;
}

export interface ObserverNextMessage extends WorkerOutgoingMessage {
  type: WorkerOutgoingMessageType.OBSERVER_NEXT;
  observerId: string;
  value: any;
}

export interface SetPlayingMessage extends WorkerOutgoingMessage {
  type: WorkerOutgoingMessageType.SET_PLAYING;
  value: boolean;
}
