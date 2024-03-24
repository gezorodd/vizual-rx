import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {VizualRxPlayer} from "./vizual-rx-player/vizual-rx-player.component";
import {VizualRxEngine} from "./core/vizual-rx-engine";
import {VizualRxEditorComponent} from "./vizual-rx-editor/vizual-rx-editor.component";
import {codeSamples} from "./vizual-rx-editor/code-samples";
import {VizualRxSideMenuComponent} from "./vizual-rx-side-menu/vizual-rx-side-menu.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, VizualRxPlayer, VizualRxEditorComponent, VizualRxSideMenuComponent, MatToolbar, MatIcon, MatIconButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  readonly engine: VizualRxEngine;
  menuVisible: boolean;

  constructor() {
    this.engine = new VizualRxEngine(codeSamples[0].code);
    this.menuVisible = true;
  }
}
