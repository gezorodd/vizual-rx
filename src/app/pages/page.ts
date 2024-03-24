import {Type} from "@angular/core";

export class Section {
  readonly label: string;
  readonly superSection?: Section;

  constructor(label: string, parent?: Section) {
    this.label = label;
    this.superSection = parent;
  }
}

const rxJsOperatorsSection = new Section('RxJS Operators');
export const combinationSection = new Section('Combination', rxJsOperatorsSection);
export const conditionalSection = new Section('Conditional', rxJsOperatorsSection);

export interface Page {
  title: string;
  routeUrl: string;
  section: Section;
  detailsComponent: Type<any>;
  sampleCode: string;
}
