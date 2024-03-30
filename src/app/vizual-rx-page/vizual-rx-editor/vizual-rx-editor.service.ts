import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {combineLatest, forkJoin, map, merge, Observable, shareReplay, Subject, tap} from "rxjs";
import * as monaco from "monaco-editor";
import {rxjsFilePaths} from "./rxjs-file-paths";

@Injectable({
  providedIn: 'root'
})
export class VizualRxEditorService {

  private readonly monacoReady$: Subject<void>;
  private readonly assetContentMap: Map<string, Observable<string>>;

  constructor(private http: HttpClient) {
    this.monacoReady$ = new Subject<void>();
    this.assetContentMap = new Map();
  }

  getOrDownloadSourceAssets(): Observable<any> {
    const allAssetPaths = [
      'assets/vizual-rx.d.ts',
      ...rxjsFilePaths
        .map(rxjsFileRelativePath => `assets/rxjs/dist/types/${rxjsFileRelativePath}`)
    ];
    return forkJoin(allAssetPaths.map(assetPath => this.getAssetContent(assetPath)));
  }

  notifyMonacoReady(): void {
    this.monacoReady$.next();
    this.monacoReady$.complete();
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
      noSyntaxValidation: false,
      diagnosticCodesToIgnore: [2322, 2362, 2345, 2339, 2365, 6387, 2363]
    });
  }

  private addExtraLibs(): Observable<any> {
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
    return merge(...addAllFiles);
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
    let assetContent$ = this.assetContentMap.get(assetPath);
    if (!assetContent$) {
      assetContent$ = this.http.get<string>(assetPath, {responseType: 'text' as 'json'})
        .pipe(
          shareReplay(1),
        );
      this.assetContentMap.set(assetPath, assetContent$);
    }
    return assetContent$;
  }
}
