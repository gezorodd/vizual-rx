import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {MatListItem, MatListOption, MatSelectionList, MatSelectionListChange} from "@angular/material/list";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NavigationEnd, NavigationStart, Router, RouterLink} from "@angular/router";
import {debounceTime, filter, map, noop, Observable, shareReplay, Subject, takeUntil, tap} from "rxjs";
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
    MatListOption,
    MatListItem,
    MatSelectionList,
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
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnDestroy {

  @Output() layoutChanged = new EventEmitter<void>;

  readonly sections: Section[] = [];
  readonly filterChanged$: Subject<string>
  readonly currentPage$: Observable<Page | undefined>;

  private destroy$ = new Subject<void>();

  constructor(private router: Router) {
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateTo(change: MatSelectionListChange): void {
    const route = change.options[0]?.value;
    if (route) {
      this.router.navigate([route])
        .then(_ => noop());
    }
  }

  getSectionHeight(section: Section, childrenHeight: number): string {
    if (section.expanding || section.collapsing) {
      return `${childrenHeight}px`;
    } else if (section.collapsed) {
      return '0';
    } else {
      return 'auto';
    }
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
    setTimeout(() => {
      this.layoutChanged.next();
    }, 0);
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
}
