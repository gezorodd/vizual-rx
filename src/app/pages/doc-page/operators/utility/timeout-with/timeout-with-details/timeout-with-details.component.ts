import { Component } from '@angular/core';
import {AlertMessageComponent} from "../../../../../../ui/alert-message/alert-message.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-timeout-with-details',
  standalone: true,
  imports: [
    AlertMessageComponent,
    RouterLink
  ],
  templateUrl: './timeout-with-details.component.html',
  styleUrl: './timeout-with-details.component.scss'
})
export class TimeoutWithDetailsComponent {

}
