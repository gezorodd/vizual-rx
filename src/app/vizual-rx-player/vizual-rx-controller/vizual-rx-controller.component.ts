import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DynamicObjectGraphics} from "../../graphics/dynamic-object-graphics";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatRipple} from "@angular/material/core";
import {MatTooltip} from "@angular/material/tooltip";
import {VizualRxEngine} from "../../core/vizual-rx-engine";
import {VizualRxScaledTime} from "../../core/vizual-rx-scaled-time";
import {VizualRxScaledTimeEngine} from "../../core/vizual-rx-scaled-time-engine";
import {VizualRxVirtualTimeEngine} from "../../core/vizual-rx-virtual-time-engine";

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

  @Input({required: true}) engine!: VizualRxEngine;
  @Output() switchEngine = new EventEmitter<void>();

  isVirtualTimeEngine: boolean = false;
  switchEngineTooltip: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.isVirtualTimeEngine = this.engine instanceof VizualRxVirtualTimeEngine;
    this.switchEngineTooltip = this.getSwitchEngineTooltip();
  }

  get timeFactor(): number {
    if (!Number.isFinite(this.engine.timeFactor)) {
      return this.engine.maxTimeFactor + 0.1;
    }
    return this.engine.timeFactor;
  }

  set timeFactor(value: number) {
    if (value > this.engine.maxTimeFactor) {
      value = Number.POSITIVE_INFINITY;
    }
    VizualRxScaledTime.defaultTimeFactor = value;
    this.engine.timeFactor = value;
  }

  get timeScale(): number {
    return DynamicObjectGraphics.timeScale$.value;
  }

  set timeScale(value: number) {
    DynamicObjectGraphics.timeScale$.next(value);
  }

  get maxTimeFactor(): number {
    let maxTimeFactor = this.engine.maxTimeFactor;
    if (this.engine.enableInfiniteTimeFactor) {
      maxTimeFactor += 0.1;
    }
    return maxTimeFactor;
  }

  private getSwitchEngineTooltip(): string {
    if (this.engine instanceof VizualRxScaledTimeEngine) {
      return 'Enable Virtual Time';
    } else {
      return 'Disable Virtual Time';
    }
  }
}
