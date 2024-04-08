import {Component, Input} from '@angular/core';
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DynamicObjectGraphics} from "../../graphics/dynamic-object-graphics";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatRipple} from "@angular/material/core";
import {MatTooltip} from "@angular/material/tooltip";
import {VizualRxEngine} from "../../engine/vizual-rx-engine.model";

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
export class VizualRxControllerComponent {

  @Input({required: true}) engine!: VizualRxEngine;

  get timeScale(): number {
    return DynamicObjectGraphics.timeScale$.value;
  }

  set timeScale(value: number) {
    DynamicObjectGraphics.timeScale$.next(value);
  }
}
