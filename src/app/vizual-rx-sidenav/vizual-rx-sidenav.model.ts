import {defer, delay, Observable, of, Subject, takeUntil, tap} from "rxjs";

export class Section {
  readonly label: string;
  readonly sections: Section[];
  readonly pages: Page[];
  readonly level: number;

  expanding: boolean;
  collapsing: boolean;
  collapsed: boolean;

  private readonly cancelCollapse$: Subject<void>;

  constructor(label: string, sections: Section[], pages: Page[], level: number) {
    this.label = label;
    this.sections = sections;
    this.pages = pages;
    this.level = level;
    this.expanding = false;
    this.collapsing = false;
    this.collapsed = false;
    this.cancelCollapse$ = new Subject<void>();
  }

  hasAnyPage(): boolean {
    if (this.pages.length) {
      return true;
    }
    return this.sections
      .some(subSection => subSection.hasAnyPage());
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

export interface ISection {
  readonly label: string;
  readonly sections?: ISection[];
  readonly pages?: Page[];
}

export interface Page {
  title: string;
  routeUrl: string;
  deprecated?: boolean;
  starred?: boolean;
}
