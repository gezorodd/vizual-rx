import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MonacoEditorModule} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {codeSamples} from "./code-samples";
import * as monaco from "monaco-editor";
import {VizualRxEditorService} from "./vizual-rx-editor.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-vizual-rx-editor',
  standalone: true,
  imports: [MonacoEditorModule, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './vizual-rx-editor.component.html',
  styleUrl: './vizual-rx-editor.component.scss'
})
export class VizualRxEditorComponent implements OnInit, OnDestroy {

  @Output() codeChange = new EventEmitter<string>();
  private _code: string = '';

  codeSamples = codeSamples;
  options = {
    automaticLayout: true,
    model: {
      language: 'typescript',
      uri: new monaco.Uri()
    }
  };

  private editor?: monaco.editor.IStandaloneCodeEditor;
  private destroy$ = new Subject<void>();

  constructor(private vizualRxEditorService: VizualRxEditorService) {
  }

  ngOnInit(): void {
    this.vizualRxEditorService.configureMonaco()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get code(): string {
    return this._code;
  }

  @Input({required: true})
  set code(value: string) {
    this._code = value;
    if (value !== this.editor?.getModel()?.getValue()) {
      this.editor?.getModel()?.setValue(value);
    }
  }

  init(editor: monaco.editor.IStandaloneCodeEditor): void {
    this.editor = editor;

    const iTextModel = this.editor!.getModel()!;
    iTextModel.setValue(this._code);
    iTextModel.onDidChangeContent(e => {
      const value = iTextModel.getValue();
      this.codeChange.next(value);
    });
    this.vizualRxEditorService.notifyMonacoReady();
  }
}
