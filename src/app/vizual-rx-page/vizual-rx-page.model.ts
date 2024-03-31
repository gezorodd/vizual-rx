import {Type} from "@angular/core";

export interface Page {
  title: string;
  routeUrl: string;
  detailsComponent: Type<any>;
  sampleCode: string;
  documentationUrl?: string;
  deprecated?: boolean;
  starred?: boolean;
}
