import {InterpreterError} from "../core/vizual-rx-interpreter";
import {VizualRxTimeData} from "../core/vizual-rx-time";

export interface WorkerMessage<TYPE> {
  readonly type: TYPE;
}

////////////
// INCOMING
////////////

export enum WorkerIncomingMessageType {
  PLAY,
  PAUSE,
  STOP,
  REPLAY,
  DESTROY,
  PREPARE,
  SET_CODE,
  SET_TIME_FACTOR
}

export interface WorkerIncomingMessage extends WorkerMessage<WorkerIncomingMessageType> {
}

export interface PrepareMessage extends WorkerIncomingMessage {
  readonly type: WorkerIncomingMessageType.PREPARE,
  readonly code: string;
}

export interface SetCodeMessage extends WorkerIncomingMessage {
  readonly type: WorkerIncomingMessageType.SET_CODE,
  readonly value: string;
}

export interface SetTimeFactorMessage extends WorkerIncomingMessage {
  readonly type: WorkerIncomingMessageType.SET_TIME_FACTOR;
  readonly value: number;
}


////////////
// OUTGOING
////////////

export enum WorkerOutgoingMessageType {
  STARTING,
  SET_PLAYING,
  STOPPING,
  SET_STOPPED,
  SYNC_TIME,
  SET_OBSERVERS,
  OBSERVER_NEXT,
  OBSERVER_ERROR,
  OBSERVER_COMPLETE,
  SET_ERROR,
}

export interface WorkerOutgoingMessage extends WorkerMessage<WorkerOutgoingMessageType> {

}

export interface StartingMessage extends WorkerOutgoingMessage {
  readonly type: WorkerOutgoingMessageType.STARTING;
  readonly time: number;
}

export interface SetErrorMessage extends WorkerOutgoingMessage {
  readonly type: WorkerOutgoingMessageType.SET_ERROR,
  readonly value: InterpreterError | undefined
}

export interface SetObserversMessage extends WorkerOutgoingMessage {
  readonly type: WorkerOutgoingMessageType.SET_OBSERVERS;
  readonly values: ObserverInfo[];
}

export interface ObserverInfo {
  readonly id: string;
  readonly label: string;
}

export interface ObserverNextMessage extends WorkerOutgoingMessage {
  readonly type: WorkerOutgoingMessageType.OBSERVER_NEXT;
  readonly observerId: string;
  readonly time: number;
  readonly value: any;
}

export interface ObserverErrorMessage extends WorkerOutgoingMessage {
  readonly type: WorkerOutgoingMessageType.OBSERVER_ERROR;
  readonly observerId: string;
  readonly time: number;
  readonly err: any;
}

export interface ObserverCompleteMessage extends WorkerOutgoingMessage {
  readonly type: WorkerOutgoingMessageType.OBSERVER_COMPLETE;
  readonly observerId: string;
  readonly time: number;
}

export interface SetPlayingMessage extends WorkerOutgoingMessage {
  readonly type: WorkerOutgoingMessageType.SET_PLAYING;
  readonly value: boolean;
}

export interface SetStoppedMessage extends WorkerOutgoingMessage {
  readonly type: WorkerOutgoingMessageType.SET_STOPPED;
  readonly value: boolean;
}

export interface SyncTimeMessage extends WorkerOutgoingMessage {
  readonly type: WorkerOutgoingMessageType.SYNC_TIME;
  readonly value: VizualRxTimeData
}
