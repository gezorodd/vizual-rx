import {Component, Input} from '@angular/core';
import {VizualRxEngine} from "../core/vizual-rx-engine";
import {AlertMessageComponent} from "../ui/alert-message/alert-message.component";
import {MatAnchor} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {NgComponentOutlet, NgIf} from "@angular/common";
import {VizualRxControllerComponent} from "../vizual-rx-controller/vizual-rx-controller.component";
import {VizualRxEditorComponent} from "../vizual-rx-editor/vizual-rx-editor.component";
import {VizualRxViewerComponent} from "../vizual-rx-viewer/vizual-rx-viewer.component";

@Component({
  selector: 'app-vizual-rx-player',
  standalone: true,
  imports: [
    AlertMessageComponent,
    MatAnchor,
    MatIcon,
    MatTooltip,
    NgComponentOutlet,
    NgIf,
    VizualRxControllerComponent,
    VizualRxEditorComponent,
    VizualRxViewerComponent
  ],
  templateUrl: './vizual-rx-player.component.html',
  styleUrl: './vizual-rx-player.component.scss'
})
export class VizualRxPlayerComponent {

  @Input({required: true}) engine!: VizualRxEngine;
}
