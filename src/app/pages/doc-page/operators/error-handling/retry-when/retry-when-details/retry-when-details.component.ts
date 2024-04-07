import { Component } from '@angular/core';
import {AlertMessageComponent} from "../../../../../../ui/alert-message/alert-message.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-retry-when-details',
  standalone: true,
  imports: [
    AlertMessageComponent,
    RouterLink
  ],
  templateUrl: './retry-when-details.component.html',
  styleUrl: './retry-when-details.component.scss'
})
export class RetryWhenDetailsComponent {

}
