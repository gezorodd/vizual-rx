import {map, Observable} from "rxjs";
import {InterpreterError} from "../core/vizual-rx-interpreter";
import {
  VizualRxEngine,
  VizualRxErrorNotification,
  VizualRxNextNotification,
  VizualRxNotification,
  VizualRxObserver
} from "./vizual-rx-engine.model";
import {VizualRxCoreEngine} from "../core/vizual-rx-core-engine"
import {VizualRxScheduler} from "../core/vizual-rx-scheduler";
import {VizualRxCoreObserver} from "../core/vizual-rx-core-observer";

export class VizualRxCoreEngineAdapter implements VizualRxEngine {
  private readonly coreEngine: VizualRxCoreEngine;

  constructor() {
    this.coreEngine = new VizualRxCoreEngine();
  }

  play(): void {
    this.coreEngine.play();
  }

  pause(): void {
    this.coreEngine.pause();
  }

  stop(): void {
    this.coreEngine.stop();
  }

  replay(): void {
    this.coreEngine.replay();
  }

  now(): number {
    return this.coreEngine.scheduler.now();
  }

  destroy(): void {
    this.coreEngine.destroy();
  }

  get stopping$(): Observable<void> {
    return this.coreEngine.stopping$;
  }

  get starting$(): Observable<void> {
    return this.coreEngine.starting$;
  }

  get stopped$(): Observable<boolean> {
    return this.coreEngine.stopped$;
  }

  get playing$(): Observable<boolean> {
    return this.coreEngine.playing$;
  }

  get playing(): boolean {
    return this.coreEngine.playing;
  }

  set timeFactor(value: number) {
    this.coreEngine.timeFactor = value;
  }

  get timeFactor(): number {
    return this.coreEngine.timeFactor;
  }

  set code(value: string) {
    this.coreEngine.code = value;
  }

  get code(): string {
    return this.coreEngine.code;
  }

  prepare(code: string): void {
    this.coreEngine.prepare(code);
  }

  get error(): InterpreterError | undefined {
    return this.coreEngine.error;
  }

  get observers$(): Observable<VizualRxObserver[]> {
    const scheduler = this.coreEngine.scheduler;
    return this.coreEngine.observers$
      .pipe(
        map(observers =>
          observers.map(observer => new VizualRxCoreObserverAdapter(scheduler, observer))
        )
      );
  }
}

class VizualRxCoreObserverAdapter implements VizualRxObserver {
  readonly id: string;
  readonly label: string;

  constructor(private scheduler: VizualRxScheduler, private coreObserver: VizualRxCoreObserver) {
    this.id = coreObserver.id;
    this.label = coreObserver.label;
  }

  get next$(): Observable<VizualRxNextNotification> {
    return this.coreObserver.next$
      .pipe(
        map(value => ({
          time: this.scheduler.now(),
          value
        }))
      );
  }

  get error$(): Observable<VizualRxErrorNotification> {
    return this.coreObserver.error$
      .pipe(
        map(err => ({
          time: this.scheduler.now(),
          err
        }))
      );
  }

  get complete$(): Observable<VizualRxNotification> {
    return this.coreObserver.complete$
      .pipe(
        map(() => ({
          time: this.scheduler.now()
        }))
      );
  }
}
