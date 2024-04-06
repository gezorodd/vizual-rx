import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {MatListItem, MatListOption, MatSelectionList, MatSelectionListChange} from "@angular/material/list";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NavigationEnd, Router} from "@angular/router";
import {filter, map, noop, Observable, shareReplay, Subject, takeUntil} from "rxjs";
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgClass, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {ISection, Page, Section} from "./sidenav.model";
import {allSectionData} from "./sidenav.data";
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
    NgClass
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnDestroy {

  @Output() layoutChanged = new EventEmitter<void>;

  sections: Section[] = [];
  private destroy$ = new Subject<void>();
  private readonly currentUrl$: Observable<string>;

  constructor(private router: Router) {
    this.sections = this.createSections();
    this.currentUrl$ = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => {
          const navigationEnd = event as NavigationEnd;
          return navigationEnd.url;
        }),
        shareReplay(1)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyFilter(input: string): void {
    this.sections = this.createSections(input.toLowerCase());
    setTimeout(() => {
      this.layoutChanged.next();
    }, 0);
  }

  isPageSelected(page: Page): Observable<boolean> {
    return this.currentUrl$
      .pipe(
        map(currentUrl => currentUrl === `/${page.routeUrl}`)
      );
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

  private createSections(filter = '', iSections: ISection[] = allSectionData, level = 0): Section[] {
    return iSections
      .map(iSection => {
        const subSections = iSection.sections ? this.createSections(filter, iSection.sections, level + 1) : [];
        const pages = (iSection.pages ?? [])
          .filter(page => page.title.toLowerCase().includes(filter));
        return new Section(iSection.label, subSections, pages, level, iSection.version);
      })
      .filter(section => section.hasAnyPage());
  }
}
