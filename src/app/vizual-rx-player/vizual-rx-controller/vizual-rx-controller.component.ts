import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DynamicObjectGraphics} from "../../graphics/dynamic-object-graphics";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatRipple} from "@angular/material/core";
import {MatTooltip} from "@angular/material/tooltip";
import {VizualRxRemote} from "../../remote/vizual-rx-remote.model";
import {VizualRxRemoteWorker} from "../../remote/vizual-rx-remote-worker";
import {VizualRxRemoteService} from "../../remote/vizual-rx-remote.service";

@Component({
  selector: 'app-vizual-rx-controller',
  standalone: true,
  imports: [
    MatSlider,
    MatSliderThumb,
    ReactiveFormsModule,
    FormsModule,
    MatIcon,
    AsyncPipe,
    NgIf,
    MatRipple,
    MatTooltip
  ],
  templateUrl: './vizual-rx-controller.component.html',
  styleUrl: './vizual-rx-controller.component.scss'
})
export class VizualRxControllerComponent implements OnChanges {

  @Input({required: true}) remote!: VizualRxRemote;
  @Output() switchRemote = new EventEmitter<void>();

  isWebWorkerDisabled: boolean;
  isWebWorkerSupported: boolean;
  isWebWorkerRemote: boolean = false;
  switchRemoteTooltip: string = '';

  constructor(private vizualRxRemoteService: VizualRxRemoteService) {
    this.isWebWorkerDisabled = vizualRxRemoteService.isWebWorkerDisabled();
    this.isWebWorkerSupported = vizualRxRemoteService.isWebWorkerSupported();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isWebWorkerRemote = this.remote instanceof VizualRxRemoteWorker;
    this.switchRemoteTooltip = this.getRemoteSwitchTooltip();
  }

  get timeFactor(): number {
    return this.remote.timeFactor;
  }

  set timeFactor(value: number) {
    this.vizualRxRemoteService.defaultTimeFactor = value;
    this.remote.timeFactor = value;
  }

  get timeScale(): number {
    return DynamicObjectGraphics.timeScale$.value;
  }

  set timeScale(value: number) {
    DynamicObjectGraphics.timeScale$.next(value);
  }

  private getRemoteSwitchTooltip(): string {
    if (!this.vizualRxRemoteService.isWebWorkerSupported()) {
      return 'Web Workers are not supported by your browser';
    }
    if (this.remote instanceof VizualRxRemoteWorker) {
      return 'Disable Web Worker'
    }
    return 'Enable Web Worker';
  }
}
