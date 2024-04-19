import { Component } from '@angular/core';
import {AlertMessageComponent} from "../../../../../../ui/alert-message/alert-message.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-repeat-when-details',
  standalone: true,
  imports: [
    AlertMessageComponent,
    RouterLink
  ],
  templateUrl: './repeat-when-details.component.html',
  styleUrl: './repeat-when-details.component.scss'
})
export class RepeatWhenDetailsComponent {

}
