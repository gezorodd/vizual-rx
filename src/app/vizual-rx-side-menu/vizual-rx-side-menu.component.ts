import {Component} from '@angular/core';
import {MatListItem, MatListOption, MatSelectionList, MatSelectionListChange} from "@angular/material/list";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NavigationEnd, Router} from "@angular/router";
import {filter, map, noop, Observable, shareReplay} from "rxjs";
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf, NgTemplateOutlet} from "@angular/common";
import {Page} from "../pages/page.model";
import {ISection, Section} from "./vizual-rx-side-menu.model";
import {allSectionData} from "./vizual-rx-side-menu.data";

@Component({
  selector: 'app-vizual-rx-side-menu',
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
    NgForOf
  ],
  templateUrl: './vizual-rx-side-menu.component.html',
  styleUrl: './vizual-rx-side-menu.component.scss'
})
export class VizualRxSideMenuComponent {

  sections: Section[] = [];
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

  applyFilter(input: string): void {
    this.sections = this.createSections(input.toLowerCase());
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

  private createSections(filter = '', iSections: ISection[] = allSectionData, level = 0): Section[] {
    return iSections
      .map(iSection => {
        const subSections = iSection.sections ? this.createSections(filter, iSection.sections, level + 1) : [];
        const pages = (iSection.pages ?? [])
          .filter(page => page.title.toLowerCase().includes(filter));
        return new Section(iSection.label, subSections, pages, level);
      })
      .filter(section => section.hasAnyPage());
  }
}
