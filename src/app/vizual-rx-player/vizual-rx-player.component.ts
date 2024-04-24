import {Component, EventEmitter, HostListener, Input, OnDestroy, Output} from '@angular/core';
import {AlertMessageComponent} from "../ui/alert-message/alert-message.component";
import {MatAnchor} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {NgComponentOutlet, NgIf} from "@angular/common";
import {VizualRxControllerComponent} from "./vizual-rx-controller/vizual-rx-controller.component";
import {VizualRxEditorComponent} from "./vizual-rx-editor/vizual-rx-editor.component";
import {VizualRxViewerComponent} from "./vizual-rx-viewer/vizual-rx-viewer.component";
import {VizualRxEngine} from "../core/vizual-rx-engine";
import {VizualRxVirtualTimeEngine} from "../core/vizual-rx-virtual-time-engine";
import {VizualRxScaledTimeEngine} from "../core/vizual-rx-scaled-time-engine";

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
export class VizualRxPlayerComponent implements OnDestroy {

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
