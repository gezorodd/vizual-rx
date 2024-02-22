import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {VizualRxPlayer} from "./vizual-rx-player/vizual-rx-player.component";
import {VizualRxEngine} from "./core/vizual-rx-engine";
import {VizualRxEditorComponent} from "./vizual-rx-editor/vizual-rx-editor.component";
import {codeSamples} from "./vizual-rx-editor/code-samples";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, VizualRxPlayer, VizualRxEditorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  readonly engine: VizualRxEngine;

  constructor() {
    this.engine = new VizualRxEngine(codeSamples[0].code);
  }
}
