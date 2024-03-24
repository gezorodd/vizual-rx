import {Type} from "@angular/core";

export interface Page {
  title: string;
  routeUrl: string;
  detailsComponent: Type<any>;
  sampleCode: string;
}
