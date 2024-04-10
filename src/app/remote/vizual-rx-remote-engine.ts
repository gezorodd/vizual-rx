import {map, Observable} from "rxjs";
import {InterpreterError} from "../core/vizual-rx-interpreter";
import {
  VizualRxRemote,
  VizualRxRemoteErrorNotification,
  VizualRxRemoteNextNotification,
  VizualRxRemoteNotification,
  VizualRxRemoteObserver
} from "./vizual-rx-remote.model";
import {VizualRxEngine} from "../core/vizual-rx-engine"
import {VizualRxScheduler} from "../core/vizual-rx-scheduler";
import {VizualRxObserver} from "../core/vizual-rx-observer";

export class VizualRxRemoteEngine implements VizualRxRemote {
  private readonly engine: VizualRxEngine;

  constructor() {
    this.engine = new VizualRxEngine();
  }

  play(): void {
    this.engine.play();
  }

  pause(): void {
    this.engine.pause();
  }

  stop(): void {
    this.engine.stop();
  }

  replay(): void {
    this.engine.replay();
  }

  now(): number {
    return this.engine.scheduler.now();
  }

  destroy(): void {
    this.engine.destroy();
  }

  get starting$(): Observable<number> {
    return this.engine.starting$
      .pipe(
        map(() => this.now())
      );
  }

  get playing$(): Observable<boolean> {
    return this.engine.playing$;
  }

  get playing(): boolean {
    return this.engine.playing;
  }

  get stopping$(): Observable<void> {
    return this.engine.stopping$;
  }

  get stopped$(): Observable<boolean> {
    return this.engine.stopped$;
  }

  set timeFactor(value: number) {
    this.engine.timeFactor = value;
  }

  get timeFactor(): number {
    return this.engine.timeFactor;
  }

  set code(value: string) {
    this.engine.code = value;
  }

  get code(): string {
    return this.engine.code;
  }

  prepare(code: string): void {
    this.engine.prepare(code);
  }

  get error(): InterpreterError | undefined {
    return this.engine.error;
  }

  get observers$(): Observable<VizualRxRemoteObserver[]> {
    const scheduler = this.engine.scheduler;
    return this.engine.observers$
      .pipe(
        map(observers =>
          observers.map(observer => new VizualRxObserverAdapter(scheduler, observer))
        )
      );
  }
}

class VizualRxObserverAdapter implements VizualRxRemoteObserver {
  readonly id: string;
  readonly label: string;

  constructor(private scheduler: VizualRxScheduler, private observer: VizualRxObserver) {
    this.id = observer.id;
    this.label = observer.label;
  }

  get next$(): Observable<VizualRxRemoteNextNotification> {
    return this.observer.next$
      .pipe(
        map(value => ({
          time: this.scheduler.now(),
          value
        }))
      );
  }

  get error$(): Observable<VizualRxRemoteErrorNotification> {
    return this.observer.error$
      .pipe(
        map(err => ({
          time: this.scheduler.now(),
          err
        }))
      );
  }

  get complete$(): Observable<VizualRxRemoteNotification> {
    return this.observer.complete$
      .pipe(
        map(() => ({
          time: this.scheduler.now()
        }))
      );
  }
}
