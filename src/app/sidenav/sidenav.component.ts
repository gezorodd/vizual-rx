import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {
  combineLatest,
  concat,
  debounceTime,
  EMPTY,
  filter,
  from,
  map,
  merge,
  mergeAll,
  mergeMap,
  noop,
  Observable,
  shareReplay,
  Subject,
  takeUntil,
  tap,
  timer
} from "rxjs";
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgClass, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {Page, Section} from "./sidenav.model";
import {sectionDefinitions} from "./sidenav.data";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    FormsModule,
    AsyncPipe,
    NgTemplateOutlet,
    NgForOf,
    MatAnchor,
    MatTooltip,
    NgIf,
    MatButton,
    NgClass,
    RouterLink,
    MatMenu,
    MatMenuTrigger,
    MatIconButton,
    MatMenuItem,
    MatCheckbox
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements AfterViewInit, OnDestroy {

  @Output() layoutChanged = new EventEmitter<void>;
  @ViewChildren('sectionChildrenContainer') sectionChildrenContainers?: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChildren('pageLink') pageLinks?: QueryList<ElementRef<HTMLAnchorElement>>;

  readonly sections: Section[] = [];
  readonly filterChanged$: Subject<string>
  readonly currentPage$: Observable<Page | undefined>;

  private _pageVisibilityMode: PageVisibilityMode;
  private readonly destroy$ = new Subject<void>();
  private readonly sectionChildrenContainerIdRegex = /^section-(\d+)-children-container$/;

  constructor(private router: Router) {
    this._pageVisibilityMode = 'show-all';
    this.filterChanged$ = new Subject<string>();
    this.sections = sectionDefinitions
      .map(sectionDefinition => new Section(sectionDefinition));

    const allPages = this.getAllPages();
    // this.logAllPageUrls(allPages);
    this.currentPage$ = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => {
          const navigationEnd = event as NavigationEnd;
          const url = navigationEnd.urlAfterRedirects ?? navigationEnd.url;
          const currentPage = allPages.find(page => url.match(`^/${page.routeUrl}(/.*)?$`));
          if (currentPage) {
            this.findSectionsContainingPage(currentPage)
              .forEach(section => section.collapsed = false);
          }
          return currentPage;
        }),
        tap(currentPage => {
          if (currentPage) {
            this.ensurePageIsIntoViewport(currentPage);
          }
        }),
        shareReplay(1)
      );

    this.filterChanged$
      .pipe(
        debounceTime(300),
        tap(input => this.applyFilter(input)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.updateSectionChildrenHeightWhenNeeded()
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSectionCollapsed(section: Section): void {
    section.toggleCollapse()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.layoutChanged.next();
      });
  }

  expandAll(): void {
    const allSectionExpansion$ = from(
      this.getAllSections()
        .map(section => {
          if (section.collapsed || section.collapsing) {
            return section.toggleCollapse();
          } else {
            return EMPTY;
          }
        })
    ).pipe(
      mergeAll()
    )
    allSectionExpansion$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.layoutChanged.next();
      });
  }

  collapseAll(): void {
    const allSectionCollapsing$ = from(
      this.getAllSections()
        .map(section => {
          if (!section.collapsed || section.expanding) {
            return section.toggleCollapse();
          } else {
            return EMPTY;
          }
        })
    ).pipe(
      mergeAll()
    )
    allSectionCollapsing$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.layoutChanged.next();
      });
  }

  get pageVisibilityMode(): PageVisibilityMode {
    return this._pageVisibilityMode;
  }

  set pageVisibilityMode(value: PageVisibilityMode) {
    this._pageVisibilityMode = value;
    this.getAllPages()
      .forEach(page => {
        switch (value) {
          case "show-all":
            page.hidden = false;
            break;
          case "hide-deprecated":
            page.hidden = page.deprecated;
            break;
          case "only-show-starred":
            page.hidden = !page.starred;
            break;
        }
      });
  }

  isPageVisible(page: Page): boolean {
    return !page.hidden && !page.filtered;
  }

  private applyFilter(input: string): void {
    if (!input) {
      this.getAllPages()
        .forEach(page => page.filtered = false);
    } else {
      const inputLower = input.toLowerCase();
      this.getAllPages()
        .forEach(page => page.filtered = !page.title.toLowerCase().includes(inputLower));
      this.getAllSections()
        .filter(section => !section.filtered)
        .forEach(section => section.collapsed = false);

      const exactMatchPage = this.getAllPages()
        .find(page => page.title.toLowerCase() === input.toLowerCase());
      if (exactMatchPage) {
        this.router.navigate([exactMatchPage.routeUrl])
          .then(noop);
      }
    }

    concat(this.updateAllSectionChildrenHeight(), timer(0))
      .subscribe(() => {
        this.layoutChanged.next();
      });
  }

  private getAllPages(sections: Section[] = this.sections): Page[] {
    if (sections.length === 0) {
      return [];
    }
    return [
      ...sections.flatMap(section => section.pages),
      ...this.getAllPages(sections.flatMap(section => section.children))
    ];
  }

  private getAllSections(sections: Section[] = this.sections): Section[] {
    if (sections.length === 0) {
      return [];
    }
    return [
      ...sections,
      ...this.getAllSections(sections.flatMap(section => section.children))
    ];
  }

  private findSectionsContainingPage(page: Page, sections: Section[] = this.sections): Section[] {
    if (sections.length === 0) {
      return [];
    }
    return [
      ...sections.filter(section => section.pages.includes(page)),
      ...this.findSectionsContainingPage(page, sections.flatMap(section => section.children))
    ]
  }

  private updateAllSectionChildrenHeight(): Observable<unknown> {
    return from(
      this.getAllSections().sort((s1, s2) => s2.level - s1.level)
    ).pipe(
      tap(section => this.updateSectionChildrenHeight(section)),
      takeUntil(this.destroy$)
    );
  }

  private updateSectionChildrenHeightWhenNeeded(): Observable<unknown> {
    const allSections$ = from(
      this.getAllSections().sort((s1, s2) => s2.level - s1.level)
    );
    const allSectionsOnChange$ = allSections$
      .pipe(
        mergeMap(section =>
          combineLatest([section.expanding$, section.collapsing$, section.collapsed$])
            .pipe(
              map(() => section)
            )
        )
      );
    return merge(allSections$, allSectionsOnChange$)
      .pipe(
        tap(section => this.updateSectionChildrenHeight(section)),
        takeUntil(this.destroy$)
      );
  }

  private updateSectionChildrenHeight(section: Section): void {
    if (!this.sectionChildrenContainers) {
      return;
    }

    const sectionChildrenContainerElement = this.sectionChildrenContainers
      .map(sectionChildrenContainer => sectionChildrenContainer.nativeElement)
      .find(sectionChildrenContainerElement => {
        const result = this.sectionChildrenContainerIdRegex.exec(sectionChildrenContainerElement.id);
        if (!result || result.length < 2) {
          return false;
        }
        const sectionId = parseInt(result[1]);
        return sectionId === section.id;
      });
    if (!sectionChildrenContainerElement) {
      return;
    }

    if (section.collapsed && !section.expanding) {
      sectionChildrenContainerElement.style.display = 'none';
    } else {
      sectionChildrenContainerElement.style.display = 'inherit';

      let targetHeightValue: string;
      if (section.expanding || section.collapsing) {
        const sectionChildrenElement = sectionChildrenContainerElement.getElementsByClassName('section-children')[0];
        targetHeightValue = `${sectionChildrenElement.clientHeight}px`;
      } else {
        targetHeightValue = 'auto';
      }

      sectionChildrenContainerElement.style.minHeight = targetHeightValue;
      sectionChildrenContainerElement.style.maxHeight = targetHeightValue;
      if (section.parent) {
        this.updateSectionChildrenHeight(section.parent);
      }
      sectionChildrenContainerElement.style.minHeight = 'inherit';
      sectionChildrenContainerElement.style.maxHeight = 'inherit';
      sectionChildrenContainerElement.style.height = targetHeightValue;

      if (section.collapsing) {
        setTimeout(() => {
          sectionChildrenContainerElement.style.height = '0px';
        }, 0);
      }
    }
  }

  private ensurePageIsIntoViewport(page: Page): void {
    if (!this.pageLinks) {
      return;
    }
    const pageLink = this.pageLinks
      .map(pageLink => pageLink.nativeElement)
      .find(linkElement => linkElement.getAttribute('href') === `/${page.routeUrl}`);
    if (pageLink && !this.isInViewport(pageLink)) {
      pageLink.scrollIntoView({block: "start", inline: "nearest", behavior: 'smooth'});
    }
  }

  private isInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    const html = document.documentElement;
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || html.clientHeight) &&
      rect.right <= (window.innerWidth || html.clientWidth)
    );
  }

  private logAllPageUrls(pages: Page[]): void {
    const appBaseUrl = 'https://vizual-rx.vercel.app';
    const allPageUrls = pages
      .map(page => `${appBaseUrl}/${page.routeUrl}`)
      .sort((u1, u2) => {
        const n1 = (u1.match(/\//g) || []).length;
        const n2 = (u2.match(/\//g) || []).length;
        if (n2 !== n1) {
          return n1 - n2;
        } else {
          return u1.localeCompare(u2);
        }
      })
      .join('\n');
    console.log(allPageUrls);
  }
}

declare type PageVisibilityMode = 'show-all' | 'hide-deprecated' | 'only-show-starred';
