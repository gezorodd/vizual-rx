import {Component, EventEmitter, HostListener, Input, OnDestroy, Output} from '@angular/core';
import {AlertMessageComponent} from "../ui/alert-message/alert-message.component";
import {MatAnchor} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {NgComponentOutlet, NgIf, NgTemplateOutlet} from "@angular/common";
import {PlayerControllerComponent} from "./player-controller/player-controller.component";
import {PlayerEditorComponent} from "./player-editor/player-editor.component";
import {PlayerViewerComponent} from "./player-viewer/player-viewer.component";
import {VizualRxEngine} from "../core/vizual-rx-engine";
import {VizualRxVirtualTimeEngine} from "../core/vizual-rx-virtual-time-engine";
import {VizualRxScaledTimeEngine} from "../core/vizual-rx-scaled-time-engine";
import {PlayerViewMode} from "./player.model";
import {SCREEN_WIDTH_BREAKPOINT_PLAYER_MODE} from "../ui/responsive/responsive";

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

  viewMode: PlayerViewMode;

  private wasPausedOnBlur: boolean;

  constructor() {
    this.wasPausedOnBlur = false;
    this.viewMode = this.computeViewMode();
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

  @HostListener('window:resize')
  handleWindowResize(): void {
    this.viewMode = this.computeViewMode();
  }

  replay(): void {
    if (this.viewMode === 'editor') {
      this.viewMode = 'diagram';
    }
    this.engine.replay();
  }

  play(): void {
    if (this.viewMode === 'editor') {
      this.viewMode = 'diagram';
    }
    this.engine.play();
  }

  pause(): void {
    this.engine.pause();
  }

  stop(): void {
    if (this.viewMode === 'diagram') {
      this.viewMode = 'editor';
    }
    this.engine.stop();
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

  private computeViewMode(): PlayerViewMode {
    const screenWith = window.innerWidth;
    if (screenWith > SCREEN_WIDTH_BREAKPOINT_PLAYER_MODE) {
      return 'both';
    } else if (!this.viewMode || this.viewMode === 'both') {
      return 'editor';
    } else {
      return this.viewMode;
    }
  }
}
