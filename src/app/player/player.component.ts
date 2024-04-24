import {Component, EventEmitter, HostListener, Input, OnDestroy, Output} from '@angular/core';
import {AlertMessageComponent} from "../ui/alert-message/alert-message.component";
import {MatAnchor} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {NgComponentOutlet, NgIf} from "@angular/common";
import {PlayerControllerComponent} from "./player-controller/player-controller.component";
import {PlayerEditorComponent} from "./player-editor/player-editor.component";
import {PlayerViewerComponent} from "./player-viewer/player-viewer.component";
import {VizualRxEngine} from "../core/vizual-rx-engine";
import {VizualRxVirtualTimeEngine} from "../core/vizual-rx-virtual-time-engine";
import {VizualRxScaledTimeEngine} from "../core/vizual-rx-scaled-time-engine";

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    AlertMessageComponent,
    MatAnchor,
    MatIcon,
    MatTooltip,
    NgComponentOutlet,
    NgIf,
    PlayerControllerComponent,
    PlayerEditorComponent,
    PlayerViewerComponent
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnDestroy {

  @Input({required: true}) engine!: VizualRxEngine;
  @Input() disableMouseWheel?: boolean;
  @Input() updateLayoutLightMode?: boolean;

  @Output() codeChange = new EventEmitter<string>();
  private wasPausedOnBlur: boolean;

  constructor() {
    this.wasPausedOnBlur = false;
  }

  ngOnDestroy(): void {
    this.engine.destroy();
  }

  @HostListener('window:blur')
  handleWindowBlur(): void {
    if (this.engine instanceof VizualRxScaledTimeEngine && this.engine.playing) {
      this.engine.pause();
      this.wasPausedOnBlur = true;
    }
  }

  @HostListener('window:focus')
  handleWindowFocus(): void {
    if (this.engine instanceof VizualRxScaledTimeEngine && this.wasPausedOnBlur) {
      this.engine.play();
      this.wasPausedOnBlur = false;
    }
  }

  switchEngine(): void {
    let newEngine: VizualRxEngine;
    if (this.engine instanceof VizualRxVirtualTimeEngine) {
      newEngine = new VizualRxScaledTimeEngine();
    } else {
      newEngine = new VizualRxVirtualTimeEngine();
    }
    newEngine.code = this.engine.code;
    newEngine.timeFactor = this.engine.timeFactor;
    this.engine.destroy();
    this.engine = newEngine;
  }
}
