import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {from, mergeAll, mergeMap, Observable, of, reduce, shareReplay, startWith, Subject, tap} from "rxjs";
import * as monaco from "monaco-editor";
import path from "path-browserify";

@Injectable({
  providedIn: 'root'
})
export class VizualRxEditorService {

  private readonly monacoReady$: Subject<void>;
  private readonly exportedFileRegex = /export .* from '([^']*)';/;
  private readonly rootLibFiles = [
    'vizual-rx/index.d.ts',
    'rxjs/index.d.ts',
    'rxjs/ajax/index.d.ts',
    'rxjs/fetch/index.d.ts',
    'rxjs/webSocket/index.d.ts',
    'rxjs/operators/index.d.ts'
  ];

  private extraLibs$?: Observable<ExtraLib[]>;

  constructor(private http: HttpClient) {
    this.monacoReady$ = new Subject<void>();
  }

  notifyMonacoReady(): void {
    this.monacoReady$.next();
    this.monacoReady$.complete();
  }

  configureMonaco(): Observable<unknown> {
    return this.monacoReady$
      .pipe(
        tap(() => {
          this.initMonacoCompilerOptions();
          this.initMonacoDiagnosticsOptions();
        }),
        mergeMap(() => this.addExtraLibs())
      );
  }

  getExtraLibs(): Observable<ExtraLib[]> {
    if (!this.extraLibs$) {
      this.extraLibs$ = from(this.rootLibFiles)
        .pipe(
          mergeMap(filePath => this.getExtraLib(filePath)),
          reduce((acc, current) => [...acc, ...current], [] as ExtraLib[]),
          shareReplay(1)
        )
      ;
    }
    return this.extraLibs$;
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

  private addExtraLibs(): Observable<unknown> {
    return this.getExtraLibs()
      .pipe(
        tap(extraLibs => {
          extraLibs.forEach(extraLib => {
            this.typescriptConfig.addExtraLib(extraLib.content, extraLib.filePath);
          });
        })
      );
  }

  private getExtraLib(filePath: string, followExports: boolean = true): Observable<ExtraLib[]> {
    const assetPath = `assets/${filePath}`;
    const libPath = `file:///node_modules/@types/${filePath}`;
    const directoryPath = path.parse(filePath).dir;

    return this.http.get<string>(assetPath, {responseType: 'text' as 'json'})
      .pipe(
        mergeMap(content => {
          const rootExtraLib = new ExtraLib(content, libPath);
          if (followExports) {
            const followExtraLibArray = [];
            let result: RegExpExecArray | null;
            let str = content;
            while (result = this.exportedFileRegex.exec(str)) {
              const followFilePath = path.join(directoryPath, result[1]) + '.d.ts';
              followExtraLibArray.push(this.getExtraLib(followFilePath, false));
              str = str.substring(result.index + 1);
            }

            return from(followExtraLibArray)
              .pipe(
                startWith(of([rootExtraLib])),
                mergeAll(),
                reduce((acc, current) => [...acc, ...current], [] as ExtraLib[])
              );
          } else {
            return of([rootExtraLib]);
          }
        })
      );
  }
}

class ExtraLib {
  readonly content: string;
  readonly filePath: string;

  constructor(content: string, filePath: string) {
    this.content = content;
    this.filePath = filePath;
  }
}
