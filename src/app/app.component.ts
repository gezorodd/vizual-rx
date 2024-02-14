import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {VizualRxViewer} from "./vizual-rx-viewer/vizual-rx-viewer.component";
import {VizualRxPlayerComponent} from "./vizual-rx-player/vizual-rx-player.component";
import {VizualRxEngine} from "./core/vizual-rx-engine";
import {VizualRxEditorComponent} from "./vizual-rx-editor/vizual-rx-editor.component";
import {codeSamples} from "./vizual-rx-editor/code-samples";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, VizualRxViewer, VizualRxPlayerComponent, VizualRxEditorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  readonly engine: VizualRxEngine;

  constructor() {
    this.engine = new VizualRxEngine(codeSamples[3].code);
  }
}
