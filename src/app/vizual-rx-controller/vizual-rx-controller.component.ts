import {Component} from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DynamicObjectGraphics} from "../graphics/dynamic-object-graphics";
import {VizualRxEngine} from "../core/vizual-rx-engine";
import {AppService} from "../app.service";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatMiniFabButton} from "@angular/material/button";
import {MatRipple} from "@angular/material/core";
import {MatTooltip} from "@angular/material/tooltip";

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

  engine: VizualRxEngine;

  constructor(appService: AppService) {
    this.engine = appService.engine;
  }

  get timeScale(): number {
    return DynamicObjectGraphics.timeScale$.value;
  }

  set timeScale(value: number) {
    DynamicObjectGraphics.timeScale$.next(value);
  }
}
