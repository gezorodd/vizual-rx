import { Component } from '@angular/core';
import {AlertMessageComponent} from "../../../../../../ui/alert-message/alert-message.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-publish-behavior-details',
  standalone: true,
  imports: [
    AlertMessageComponent,
    RouterLink
  ],
  templateUrl: './publish-behavior-details.component.html',
  styleUrl: './publish-behavior-details.component.scss'
})
export class PublishBehaviorDetailsComponent {

}
