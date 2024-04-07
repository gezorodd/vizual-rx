import {defer, delay, Observable, of, Subject, takeUntil, tap} from "rxjs";

export class Section {
  readonly label: string;
  readonly children: Section[];
  readonly pages: Page[];
  readonly level: number;
  readonly version?: string;

  expanding: boolean;
  collapsing: boolean;
  collapsed: boolean;

  private readonly cancelCollapse$: Subject<void>;

  constructor(sectionDefinition: SectionDefinition, level: number = 0) {
    this.label = sectionDefinition.label;
    this.children = sectionDefinition.children?.map(child => new Section(child, level + 1)) ?? [];
    this.pages = sectionDefinition.pages ?? [];
    this.level = level;
    this.version = sectionDefinition.version;
    this.expanding = false;
    this.collapsing = false;
    this.collapsed = sectionDefinition.collapsed ?? false;
    this.cancelCollapse$ = new Subject<void>();
  }

  get hidden(): boolean {
    return this.children.every(child => child.hidden) && this.pages.every(page => page.hidden);
  }

  toggleCollapse(animationDelay: number): Observable<boolean> {
    return defer(() => {
      if (this.expanding || this.collapsing) {
        this.cancelCollapse$.next();
        this.expanding = false;
        this.collapsing = false;
        return of(this.collapsed);
      } else if (this.collapsed) {
        this.expanding = true;
        return of(false)
          .pipe(
            delay(animationDelay),
            takeUntil(this.cancelCollapse$),
            tap(() => {
              this.collapsed = false;
              this.expanding = false;
            })
          );
      } else {
        this.collapsing = true;
        return of(true)
          .pipe(
            delay(0),
            tap(() => {
              this.collapsed = true;
              this.collapsing = false;
            }),
            delay(animationDelay)
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
