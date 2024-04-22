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

  @Input({required: true}) remote!: VizualRxEngine;
  @Input() disableMouseWheel?: boolean;
  @Input() updateLayoutLightMode?: boolean;

  @Output() codeChange = new EventEmitter<string>();
  private wasPausedOnBlur: boolean;

  constructor() {
    this.wasPausedOnBlur = false;
  }

  ngOnDestroy(): void {
    this.remote.destroy();
  }

  @HostListener('window:blur')
  handleWindowBlur(): void {
    if (this.remote instanceof VizualRxScaledTimeEngine && this.remote.playing) {
      this.remote.pause();
      this.wasPausedOnBlur = true;
    }
  }

  @HostListener('window:focus')
  handleWindowFocus(): void {
    if (this.remote instanceof VizualRxScaledTimeEngine && this.wasPausedOnBlur) {
      this.remote.play();
      this.wasPausedOnBlur = false;
    }
  }

  switchRemote(): void {
    let newRemote: VizualRxEngine;
    if (this.remote instanceof VizualRxVirtualTimeEngine) {
      newRemote = new VizualRxScaledTimeEngine();
    } else {
      newRemote = new VizualRxVirtualTimeEngine();
    }
    newRemote.code = this.remote.code;
    newRemote.timeFactor = this.remote.timeFactor;
    this.remote.destroy();
    this.remote = newRemote;
  }
}
