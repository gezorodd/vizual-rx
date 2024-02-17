import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {VizualRxEngine} from "../core/vizual-rx-engine";
import {JsonPipe, NgForOf} from "@angular/common";
import {TimeTrackComponent} from "./time-track/time-track.component";
import {ObserverTrackComponent} from "./observer-track/observer-track.component";
import {VizualRxObserver} from "../core/vizual-rx-observer";

@Component({
  selector: 'app-vizual-rx-viewer',
  standalone: true,
  imports: [
    NgForOf,
    JsonPipe,
    TimeTrackComponent,
    ObserverTrackComponent
  ],
  templateUrl: './vizual-rx-viewer.component.html',
  styleUrl: './vizual-rx-viewer.component.scss'
})
export class VizualRxViewer implements OnInit, OnDestroy {

  @Input({required: true}) engine!: VizualRxEngine;

  observers: VizualRxObserver[];
  private readonly destroy$ = new Subject<void>();

  constructor() {
    this.observers = [];
  }

  ngOnInit(): void {
    this.engine.starting$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.observers = this.engine.observers);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
