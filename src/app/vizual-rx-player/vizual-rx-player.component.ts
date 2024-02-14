import {Component, Input} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {MatToolbar} from "@angular/material/toolbar";
import {VizualRxEngine} from "../core/vizual-rx-engine";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-vizual-rx-player',
  standalone: true,
  imports: [
    AsyncPipe,
    MatIcon,
    MatMiniFabButton,
    MatSlider,
    MatSliderThumb,
    MatToolbar,
    FormsModule
  ],
  templateUrl: './vizual-rx-player.component.html',
  styleUrl: './vizual-rx-player.component.scss'
})
export class VizualRxPlayerComponent {
  @Input({required: true}) engine!: VizualRxEngine;
}
