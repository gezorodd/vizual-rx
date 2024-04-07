import { Component } from '@angular/core';
import {AlertMessageComponent} from "../../../../../../ui/alert-message/alert-message.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-publish-last-details',
  standalone: true,
  imports: [
    AlertMessageComponent,
    RouterLink
  ],
  templateUrl: './publish-last-details.component.html',
  styleUrl: './publish-last-details.component.scss'
})
export class PublishLastDetailsComponent {

}
