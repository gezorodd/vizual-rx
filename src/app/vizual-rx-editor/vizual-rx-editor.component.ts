import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MonacoEditorModule} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {CodeCategory, CodeSample, codeSamples} from "./code-samples";
import * as monaco from "monaco-editor";
import {VizualRxEditorService} from "./vizual-rx-editor.service";
import {Subject, takeUntil} from "rxjs";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-vizual-rx-editor',
  standalone: true,
  imports: [MonacoEditorModule, FormsModule, MatFormFieldModule, MatSelectModule, MatIcon, MatInput],
  templateUrl: './vizual-rx-editor.component.html',
  styleUrl: './vizual-rx-editor.component.scss'
})
export class VizualRxEditorComponent implements OnInit, OnDestroy {

  @Output() codeChange = new EventEmitter<string>();
  private _code: string = '';

  editorOptions = {
    automaticLayout: true,
    model: {
      language: 'typescript',
      uri: new monaco.Uri()
    },
    theme: 'vs'
  };

  private editor?: monaco.editor.IStandaloneCodeEditor;
  private destroy$ = new Subject<void>();

  private _filteredCodeCategories: CodeCategory[];
  private _selectedCodeCategory?: CodeCategory;
  private _filteredCodeSamples: CodeSample[];
  private _filter: string;

  constructor(private vizualRxEditorService: VizualRxEditorService) {
    this._filteredCodeCategories = codeSamples
      .map(codeSample => codeSample.category)
      .filter((value, index, array) => array.indexOf(value) === index);
    this._filteredCodeSamples = [];
    this._filter = '';
    this.selectedCodeCategory = this._filteredCodeCategories[0];
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
    iTextModel.onDidChangeContent(() => {
      const value = iTextModel.getValue();
      this.codeChange.next(value);
    });
    this.vizualRxEditorService.notifyMonacoReady();
  }

  get filteredCodeCategories(): CodeCategory[] {
    return this._filteredCodeCategories;
  }

  get selectedCodeCategory(): CodeCategory | undefined {
    return this._selectedCodeCategory;
  }

  set selectedCodeCategory(value: CodeCategory | undefined) {
    this._selectedCodeCategory = value;
    if (!value) {
      this._filteredCodeSamples = [];
    } else {
      this._filteredCodeSamples = codeSamples
        .filter(codeSample => codeSample.category === this._selectedCodeCategory)
        .filter(codeSample => codeSample.label.toUpperCase().indexOf(this._filter.toUpperCase()) !== -1)
        .sort(this.sortCodeSamplesByFilterRelevance.bind(this));
    }
    if (this._filteredCodeSamples.length > 0) {
      this.code = this._filteredCodeSamples[0].code;
    }
  }

  get filteredCodeSamples(): CodeSample[] {
    return this._filteredCodeSamples;
  }

  get filter(): string {
    return this._filter;
  }

  set filter(value: string) {
    this._filter = value;
    this._filteredCodeCategories = codeSamples
      .filter(codeSample => codeSample.label.toUpperCase().indexOf(value.toUpperCase()) !== -1)
      .sort(this.sortCodeSamplesByFilterRelevance.bind(this))
      .map(codeSample => codeSample.category)
      .filter((value, index, array) => array.indexOf(value) === index);
    this.selectedCodeCategory = this._filteredCodeCategories.length > 0 ? this._filteredCodeCategories[0] : undefined;
  }

  sortCodeSamplesByFilterRelevance(c1: CodeSample, c2: CodeSample): number {
    const filterUpper = this._filter.toUpperCase();
    const upperLabel1 = c1.label.toUpperCase();
    const upperLabel2 = c2.label.toUpperCase();

    if (upperLabel1 === filterUpper) {
      return -1;
    } else if (upperLabel2 === filterUpper) {
      return 1;
    }

    const startWith1 = upperLabel1.startsWith(filterUpper);
    const startWith2 = upperLabel2.startsWith(filterUpper);
    if (startWith1) {
      if (startWith2) {
        return 0;
      } else {
        return -1;
      }
    } if (startWith2) {
      return 1;
    }

    const contains1 = upperLabel1.indexOf(filterUpper) !== -1;
    const contains2 = upperLabel2.indexOf(filterUpper) !== -1;
    if (contains1 && !contains2) {
      return -1;
    } else if (contains2 && !contains1) {
      return 1;
    }
    return 0;
  }
}
