import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {VizualRxEngine} from "../core/vizual-rx-engine";
import {AlertMessageComponent} from "../ui/alert-message/alert-message.component";
import {MatAnchor} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {NgComponentOutlet, NgIf} from "@angular/common";
import {VizualRxControllerComponent} from "./vizual-rx-controller/vizual-rx-controller.component";
import {VizualRxEditorComponent} from "./vizual-rx-editor/vizual-rx-editor.component";
import {VizualRxViewerComponent} from "./vizual-rx-viewer/vizual-rx-viewer.component";

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
  @Input() disableMouseWheel?: boolean;
  @Input() updateLayoutLightMode?: boolean;

  @Output() codeChange = new EventEmitter<string>();
  private wasPausedOnBlur: boolean;

  constructor() {
    this.wasPausedOnBlur = false;
  }

  @HostListener('window:blur')
  handleWindowBlur(): void {
    if (this.engine.playing) {
      this.engine.pause();
      this.wasPausedOnBlur = true;
    }
  }

  @HostListener('window:focus')
  handleWindowFocus(): void {
    if (this.wasPausedOnBlur) {
      this.engine.play();
      this.wasPausedOnBlur = false;
    }
  }
}
