import {Type} from "@angular/core";
import {Page} from "../../sidenav/sidenav.model";

export interface DocPage extends Page {
  detailsComponent: Type<any>;
  sampleCode: string;
  documentationUrl?: string;
  disableWebWorker?: boolean;
}
