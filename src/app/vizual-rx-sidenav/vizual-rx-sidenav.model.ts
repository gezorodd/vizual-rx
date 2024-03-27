import {Page} from "../vizual-rx-page/vizual-rx-page.model";

export class Section {
  readonly label: string;
  readonly sections: Section[];
  readonly pages: Page[];
  readonly level: number;

  expanding: boolean;
  collapsing: boolean;
  collapsed: boolean;
  private collapsedTimeout?: ReturnType<typeof setTimeout>;

  constructor(label: string, sections: Section[], pages: Page[], level: number) {
    this.label = label;
    this.sections = sections;
    this.pages = pages;
    this.level = level;
    this.expanding = false;
    this.collapsing = false;
    this.collapsed = false;
  }

  hasAnyPage(): boolean {
    if (this.pages.length) {
      return true;
    }
    return this.sections
      .some(subSection => subSection.hasAnyPage());
  }

  toggleCollapse(animationDelay: number): void {
    if (this.expanding || this.collapsing) {
      clearTimeout(this.collapsedTimeout);
      this.expanding = false;
      this.collapsing = false;
    } else if (this.collapsed) {
      this.expanding = true;
      this.collapsedTimeout = setTimeout(() => {
        this.collapsed = false;
        this.expanding = false;
      }, animationDelay);
    } else {
      this.collapsing = true;
      this.collapsedTimeout = setTimeout(() => {
        this.collapsed = true;
        this.collapsing = false;
      }, 0);
    }
  }
}

export interface ISection {
  readonly label: string;
  readonly sections?: ISection[];
  readonly pages?: Page[];
}
