import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {VizualRxEngine} from "../core/vizual-rx-engine";
import {JsonPipe, NgForOf} from "@angular/common";
import {TimeTrackComponent} from "./time-track/time-track.component";
import {ObservableTrackComponent} from "./observable-track/observable-track.component";
import {VizualRxObservable} from "../core/vizual-rx-observable";

@Component({
  selector: 'app-vizual-rx-viewer',
  standalone: true,
  imports: [
    NgForOf,
    JsonPipe,
    TimeTrackComponent,
    ObservableTrackComponent
  ],
  templateUrl: './vizual-rx-viewer.component.html',
  styleUrl: './vizual-rx-viewer.component.scss'
})
export class VizualRxViewer implements OnInit, OnDestroy {

  @Input({required: true}) engine!: VizualRxEngine;

  observables: VizualRxObservable[];
  private readonly destroy$ = new Subject<void>();

  constructor() {
    this.observables = [];
  }

  ngOnInit(): void {
    this.engine.starting$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.observables = this.engine.observables);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
