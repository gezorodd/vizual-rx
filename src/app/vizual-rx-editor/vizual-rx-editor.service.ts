import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {combineLatest, concat, map, merge, Observable, Subject, tap} from "rxjs";
import * as monaco from "monaco-editor";
import {rxjsFilePaths} from "./rxjs-file-paths";

@Injectable({
  providedIn: 'root'
})
export class VizualRxEditorService {

  private monacoReady$: Subject<void>;

  constructor(private http: HttpClient) {
    this.monacoReady$ = new Subject<void>();
  }

  notifyMonacoReady(): void {
    this.monacoReady$.next();
  }

  configureMonaco(): Observable<void> {
    const initMonacoOptions = this.monacoReady$
      .pipe(tap(() => {
        this.initMonacoCompilerOptions();
        this.initMonacoDiagnosticsOptions();
      }));

    return merge(initMonacoOptions, this.addExtraLibs());
  }

  private get typescriptConfig(): monaco.languages.typescript.LanguageServiceDefaults {
    return (window as any).monaco.languages.typescript.typescriptDefaults as monaco.languages.typescript.LanguageServiceDefaults;
  }

  private initMonacoCompilerOptions() {
    this.typescriptConfig.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2016,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      typeRoots: ["node_modules/@types"]
    });
  }

  private initMonacoDiagnosticsOptions() {
    this.typescriptConfig.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false
    });
  }

  private addExtraLibs(): Observable<void> {
    const addRxjsFiles = rxjsFilePaths
      .map(rxjsFileRelativePath => {
        const assetPath = `assets/rxjs/dist/types/${rxjsFileRelativePath}`;
        const filePath = `file:///node_modules/@types/rxjs/${rxjsFileRelativePath}`;
        return this.addExtraLib(assetPath, filePath);
      });
    const addVizualRxFile = this.addExtraLib(
      'assets/vizual-rx.d.ts',
      'file:///node_modules/@types/vizual-rx/index.d.ts'
    );

    const addAllFiles = [addVizualRxFile, ...addRxjsFiles];
    return this.parallelConcat(addAllFiles, 10);
  }

  private addExtraLib(assetPath: string, filePath: string): Observable<void> {
    return combineLatest([
      this.monacoReady$,
      this.getAssetContent(assetPath)
    ]).pipe(
      tap(([_, assetContent]) => {
        this.typescriptConfig.addExtraLib(assetContent, filePath);
      }),
      map(() => undefined)
    );
  }

  private getAssetContent(assetPath: string): Observable<string> {
    return this.http.get<string>(assetPath, {responseType: 'text' as 'json'});
  }

  private parallelConcat(input: Observable<void>[], size: number): Observable<void> {
    const groupedInput: Observable<void>[][] = [[]];
    input.forEach(input => {
      const array = groupedInput[groupedInput.length - 1];
      array.push(input);
      if (array.length >= size) {
        groupedInput.push([]);
      }
    });
    return concat(...groupedInput.map(array => merge(...array)))
      .pipe(
        map(() => undefined)
      );
  }
}
