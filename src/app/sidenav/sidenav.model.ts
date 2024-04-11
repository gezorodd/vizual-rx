import {BehaviorSubject, defer, delay, first, merge, Observable, of, Subject, takeUntil, tap} from "rxjs";

export class Section {
  private static idSeq = 1;

  readonly id: number;
  readonly label: string;
  readonly parent?: Section;
  readonly children: Section[];
  readonly pages: Page[];
  readonly level: number;
  readonly version?: string;
  readonly childrenCollapsed$: Observable<unknown>;

  private _expanding$: BehaviorSubject<boolean>;
  private _collapsing$: BehaviorSubject<boolean>;
  private _collapsed$: BehaviorSubject<boolean>;
  childrenHeight: number;

  private readonly cancelCollapse$: Subject<void>;

  constructor(sectionDefinition: SectionDefinition, parent?: Section, level: number = 0) {
    this.id = Section.idSeq++;
    this.label = sectionDefinition.label;
    this.parent = parent;
    this.children = sectionDefinition.children?.map(child => new Section(child, this, level + 1)) ?? [];
    this.pages = sectionDefinition.pages ?? [];
    this.level = level;
    this.version = sectionDefinition.version;
    this._expanding$ = new BehaviorSubject<boolean>(false);
    this._collapsing$ = new BehaviorSubject<boolean>(false);
    this._collapsed$ = new BehaviorSubject<boolean>(sectionDefinition.collapsed ?? false);
    this.cancelCollapse$ = new Subject<void>();
    this.childrenHeight = 0;
    this.childrenCollapsed$ = merge(...this.children.map(child => merge(child.collapsed$, child.collapsing$, child.expanding$)));
  }

  get expanding$(): Observable<boolean> {
    return this._expanding$.asObservable();
  }

  get expanding(): boolean {
    return this._expanding$.value;
  }

  get collapsing$(): Observable<boolean> {
    return this._collapsing$.asObservable();
  }

  get collapsing(): boolean {
    return this._collapsing$.value;
  }

  get collapsed$(): Observable<boolean> {
    return this._collapsed$.asObservable();
  }

  get collapsed(): boolean {
    return this._collapsed$.value;
  }

  set collapsed(value: boolean) {
    this._collapsed$.next(value);
  }

  get hidden(): boolean {
    return this.children.every(child => child.hidden) && this.pages.every(page => page.hidden);
  }

  toggleCollapse(animationDelay: number): Observable<boolean> {
    return defer(() => {
      if (this._expanding$.value || this._collapsing$.value) {
        this.cancelCollapse$.next();
        this._expanding$.next(false);
        this._collapsing$.next(false);
        return this._collapsed$.pipe(first());
      } else if (this._collapsed$.value) {
        this._expanding$.next(true);
        return of(false)
          .pipe(
            delay(animationDelay),
            takeUntil(this.cancelCollapse$),
            tap(() => {
              this._collapsed$.next(false);
              this._expanding$.next(false);
            })
          );
      } else {
        this._collapsing$.next(true);
        return of(true)
          .pipe(
            delay(animationDelay),
            takeUntil(this.cancelCollapse$),
            tap(() => {
              this._collapsed$.next(true);
              this._collapsing$.next(false);
            })
          );
      }
    });
  }
}

export interface SectionDefinition {
  readonly label: string;
  readonly version?: string;
  readonly children?: SectionDefinition[];
  readonly pages?: Page[];
  readonly collapsed?: boolean;
}

export interface Page {
  title: string;
  routeUrl: string;
  deprecated?: boolean;
  starred?: boolean;
  hidden?: boolean;
}
