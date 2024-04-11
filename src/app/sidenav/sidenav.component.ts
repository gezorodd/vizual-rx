import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import {NavigationStart, Router, RouterLink} from "@angular/router";
import {
  combineLatest,
  concat,
  debounceTime,
  filter,
  from,
  map,
  merge,
  mergeMap,
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
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";

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
    RouterLink
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements AfterViewInit, OnDestroy {

  @Output() layoutChanged = new EventEmitter<void>;
  @ViewChildren('sectionChildrenContainer') sectionChildrenContainers?: QueryList<ElementRef<HTMLDivElement>>;

  readonly sections: Section[] = [];
  readonly filterChanged$: Subject<string>
  readonly currentPage$: Observable<Page | undefined>;

  private readonly destroy$ = new Subject<void>();
  private readonly sectionChildrenContainerIdRegex = /^section-(\d+)-children-container$/;

  constructor(private router: Router, private changeDetectorRef: ChangeDetectorRef) {
    this.filterChanged$ = new Subject<string>();
    this.sections = sectionDefinitions
      .map(sectionDefinition => new Section(sectionDefinition));

    const allPages = this.getAllPages();
    this.currentPage$ = this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart),
        map(event => {
          const navigationStart = event as NavigationStart;
          const url = navigationStart.url;
          const currentPage = allPages.find(page => url === `/${page.routeUrl}`);
          if (currentPage) {
            this.findSectionsContainingPage(currentPage)
              .forEach(section => section.collapsed = false);
          }
          return currentPage;
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
    section.toggleCollapse(200)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.layoutChanged.next();
      });
  }

  private applyFilter(input: string): void {
    if (!input) {
      this.getAllPages()
        .forEach(page => page.hidden = false);
    } else {
      const inputLower = input.toLowerCase();
      this.getAllPages()
        .forEach(page => page.hidden = !page.title.toLowerCase().includes(inputLower));
      this.getAllSections()
        .filter(section => !section.hidden)
        .forEach(section => section.collapsed = false);
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
}
