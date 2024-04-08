import {Observable} from "rxjs";
import {InterpreterError} from "../core/vizual-rx-interpreter";
import {VizualRxObserver} from "../core/vizual-rx-observer";
import {VizualRxEngine} from "./vizual-rx-engine.model";
import {VizualRxCoreEngine} from "../core/vizual-rx-core-engine"
import {VizualRxScheduler} from "../core/vizual-rx-scheduler";

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

  get observers(): Observable<VizualRxObserver[]> {
    return this.coreEngine.observers;
  }

  get scheduler(): VizualRxScheduler {
    return this.coreEngine.scheduler;
  }
}
