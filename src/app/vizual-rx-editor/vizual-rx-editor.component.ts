import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MonacoEditorModule} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {codeSamples} from "./code-samples";

@Component({
  selector: 'app-vizual-rx-editor',
  standalone: true,
  imports: [MonacoEditorModule, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './vizual-rx-editor.component.html',
  styleUrl: './vizual-rx-editor.component.scss'
})
export class VizualRxEditorComponent {

  @Input({required: true}) code!: string;

  @Output() codeChange = new EventEmitter<string>();

  options = {language: 'typescript', automaticLayout: true};
  codeSamples = codeSamples;
}
