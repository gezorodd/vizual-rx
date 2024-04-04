import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MonacoEditorModule} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import * as monaco from "monaco-editor";
import {VizualRxEditorService} from "./vizual-rx-editor.service";
import {
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

@Component({
  selector: 'app-vizual-rx-editor',
  standalone: true,
  imports: [MonacoEditorModule, FormsModule, MatFormFieldModule, MatSelectModule, MatIcon, MatInput],
  templateUrl: './vizual-rx-editor.component.html',
  styleUrl: './vizual-rx-editor.component.scss'
})
export class VizualRxEditorComponent implements OnInit, OnDestroy {

  @Input() disableMouseWheel?: boolean;
  @Output() codeChange = new EventEmitter<string>();
  private _code: string = '';

  editorOptions: any = {
    model: {
      language: 'typescript',
      uri: monaco.Uri.parse(`${Math.random() * 9999999}`)
    },
    theme: 'vs',
    minimap: { enabled: false }
  };

  private editor?: monaco.editor.IStandaloneCodeEditor;
  private destroy$ = new Subject<void>();

  constructor(private vizualRxEditorService: VizualRxEditorService, private appService: AppService) {
    this.updateEditorLayoutDuringSidenavChange()
      .subscribe();
  }

  ngOnInit(): void {
    this.vizualRxEditorService.configureMonaco()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe();
    if (this.disableMouseWheel) {
      this.editorOptions.scrollbar = {
        handleMouseWheel: false
      };
    }
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

  private updateEditorLayoutDuringSidenavChange(): Observable<any> {
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
    const intervalDuringSidenavChange$ = sidenavStartChanging$
      .pipe(
        mergeMap(() =>
          interval(5).pipe(takeUntil(sidenavStopChanging$))
        )
      );
    return intervalDuringSidenavChange$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.editor?.layout())
      );
  }
}
