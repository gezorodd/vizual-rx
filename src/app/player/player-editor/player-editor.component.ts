import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MonacoEditorModule} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import * as monaco from "monaco-editor";
import {PlayerEditorService} from "./player-editor.service";
import {
  defer,
  distinctUntilChanged,
  expand,
  filter,
  first,
  identity,
  interval,
  map,
  mergeMap,
  Observable,
  of,
  race,
  skip,
  Subject,
  takeUntil,
  tap
} from "rxjs";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {AppService} from "../../app.service";
import {not} from "rxjs/internal/util/not";
import {v4 as uuid} from 'uuid';

@Component({
  selector: 'app-player-editor',
  standalone: true,
  imports: [MonacoEditorModule, FormsModule, MatFormFieldModule, MatSelectModule, MatIcon, MatInput],
  templateUrl: './player-editor.component.html',
  styleUrl: './player-editor.component.scss'
})
export class PlayerEditorComponent implements OnInit, OnDestroy {

  @Input() disableMouseWheel?: boolean;
  @Input() updateLayoutLightMode?: boolean;

  @Output() codeChange = new EventEmitter<string>();
  @Output() ctrlEnter = new EventEmitter<void>();
  @Output() ctrlShiftSpace = new EventEmitter<void>();
  @Output() ctrlK = new EventEmitter<void>();
  private _code: string = '';

  editorOptions: any = {
    model: {
      language: 'typescript',
      uri: monaco.Uri.parse(`${uuid()}`)
    },
    theme: 'vs',
    minimap: {enabled: false},
    scrollBeyondLastLine: false,
    fixedOverflowWidgets: true
  };

  private editor?: monaco.editor.IStandaloneCodeEditor;
  private destroy$ = new Subject<void>();

  constructor(private vizualRxEditorService: PlayerEditorService, private appService: AppService) {
  }

  ngOnInit(): void {
    this.vizualRxEditorService.configureMonaco()
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    if (this.disableMouseWheel) {
      this.editorOptions.scrollbar = {
        handleMouseWheel: false
      };
    }
    this.updateEditorLayoutDuringSidenavChange()
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

    this.configureKeyBindings(this.editor);
    this.vizualRxEditorService.notifyMonacoReady();
  }

  private updateEditorLayoutDuringSidenavChange(): Observable<any> {
    return defer(() => {
      if (this.updateLayoutLightMode) {
        return this.appService.sidenavOpenedChanged$;
      }
      const sidenavIsChanging$ = of(1)
        .pipe(
          expand(counter => {
            return race(
              this.appService.sidenavOpenedState$.pipe(skip(1), map(() => counter + 1)),
              this.appService.sidenavOpenedChanged$.pipe(map(() => counter - 1))
            ).pipe(first());
          }),
          map(counter => counter > 0),
          distinctUntilChanged()
        );
      const sidenavStartChanging$ = sidenavIsChanging$
        .pipe(
          filter(identity)
        );
      const sidenavStopChanging$ = sidenavIsChanging$
        .pipe(
          filter(not(identity, this))
        );
      return sidenavStartChanging$
        .pipe(
          mergeMap(() =>
            interval(15).pipe(takeUntil(sidenavStopChanging$))
          )
        );
    })
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.editor?.layout())
      );
  }

  private configureKeyBindings(editor: monaco.editor.IStandaloneCodeEditor): void {
    editor.onDidFocusEditorWidget(() => {
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        this.ctrlEnter.next();
      });
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Space, () => {
        this.ctrlShiftSpace.next();
      });
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK, () => {
        this.ctrlK.next();
      });
    });
  }
}
