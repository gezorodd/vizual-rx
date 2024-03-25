import {Page} from "../pages/page.model";

export class Section {
  readonly label: string;
  readonly sections: Section[];
  readonly pages: Page[];
  readonly level: number;

  constructor(label: string, sections: Section[], pages: Page[], level: number) {
    this.label = label;
    this.sections = sections;
    this.pages = pages;
    this.level = level;
  }

  hasAnyPage(): boolean {
    if (this.pages.length) {
      return true;
    }
    return this.sections
      .some(subSection => subSection.hasAnyPage());
  }
}

export interface ISection {
  readonly label: string;
  readonly sections?: ISection[];
  readonly pages?: Page[];
}
