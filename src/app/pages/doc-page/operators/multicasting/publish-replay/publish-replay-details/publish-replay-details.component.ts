import { Component } from '@angular/core';
import {AlertMessageComponent} from "../../../../../../ui/alert-message/alert-message.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-publish-replay-details',
  standalone: true,
  imports: [
    AlertMessageComponent,
    RouterLink
  ],
  templateUrl: './publish-replay-details.component.html',
  styleUrl: './publish-replay-details.component.scss'
})
export class PublishReplayDetailsComponent {

}
