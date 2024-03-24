import {Component} from '@angular/core';
import {MatListItem, MatListOption, MatSelectionList, MatSelectionListChange} from "@angular/material/list";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NavigationEnd, Router} from "@angular/router";
import {filter, map, noop, Observable, shareReplay} from "rxjs";
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf, NgTemplateOutlet} from "@angular/common";
import {pages} from "../pages/pages";
import {Page, Section} from "../pages/page";

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

  menus: Menu[] = [];
  private readonly allMenus: Menu[];
  private readonly currentUrl$: Observable<string>;

  constructor(private router: Router) {
    this.allMenus = this.buildMenuTree(pages);
    this.applyFilter('');
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
    const lowerInput = input.toLowerCase();
    const filteredMenus = this.allMenus
      .map(menu => this.createFilteredMenu(menu, lowerInput));
    this.menus = this.removeEmptyMenus(filteredMenus);
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

  private buildMenuTree(pages: Page[]): Menu[] {
    const rootMenus = this.computeRootMenus(pages);
    this.computeMenuLevels(rootMenus, 0);
    return rootMenus.map(rootMenu => rootMenu.build());
  }

  private computeRootMenus(pages: Page[]): MenuBuilder[] {
    const rootMenus: MenuBuilder[] = [];
    const sectionToMenu: Map<Section, MenuBuilder> = new Map();

    pages.forEach(page => {
      const sections: Section[] = [];
      let section: Section | undefined = page.section;
      do {
        sections.splice(0, 0, section);
      } while ((section = section.superSection));

      let superMenu: MenuBuilder | undefined;
      sections.forEach(section => {
        let menu = sectionToMenu.get(section);
        if (!menu) {
          menu = new MenuBuilder(section.label);
          sectionToMenu.set(section, menu);
        }
        if (superMenu && !superMenu.subMenus.includes(menu)) {
          superMenu.subMenus.push(menu);
        } else if (!superMenu && !rootMenus.includes(menu)) {
          rootMenus.push(menu);
        }
        superMenu = menu;
      });

      superMenu?.pages.push(page);
    });
    return rootMenus;
  }

  private computeMenuLevels(menus: MenuBuilder[], level: number) {
    menus
      .forEach(menu => {
        menu.level = level;
        this.computeMenuLevels(menu.subMenus, level + 1);
      });
  }

  private createFilteredMenu(menu: Menu, filter: string): Menu {
    return new Menu(
      menu.label,
      menu.subMenus
        .map(subMenu => this.createFilteredMenu(subMenu, filter)),
      menu.pages
        .filter(page => page.title.toLowerCase().includes(filter)),
      menu.level
    );
  }

  private removeEmptyMenus(menu: Menu[]): Menu[] {
    return menu
      .filter(menu => menu.hasAnyPage())
      .map(menu => new Menu(
        menu.label,
        this.removeEmptyMenus(menu.subMenus),
        menu.pages,
        menu.level
      ));
  }
}

class MenuBuilder {
  readonly label: string;
  readonly subMenus: MenuBuilder[];
  readonly pages: Page[];
  level?: number;

  constructor(label: string) {
    this.label = label;
    this.subMenus = [];
    this.pages = [];
  }

  build(): Menu {
    return new Menu(
      this.label,
      this.subMenus.map(subMenus => subMenus.build()),
      this.pages,
      this.level ?? 0
    );
  }
}

class Menu {
  readonly label: string;
  readonly subMenus: Menu[];
  readonly pages: Page[];
  readonly level: number;

  constructor(label: string, subMenus: Menu[], pages: Page[], level: number) {
    this.label = label;
    this.subMenus = subMenus;
    this.pages = pages;
    this.level = level;
  }

  hasAnyPage(): boolean {
    if (this.pages.length) {
      return true;
    }
    return this.subMenus
      .some(subMenu => subMenu.hasAnyPage());
  }
}
