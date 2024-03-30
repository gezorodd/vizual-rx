import { Component } from '@angular/core';
import {AlertMessageComponent} from "../../../../../ui/alert-message/alert-message.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-exhaust-all-details',
  standalone: true,
  imports: [
    AlertMessageComponent,
    RouterLink
  ],
  templateUrl: './exhaust-all-details.component.html',
  styleUrl: './exhaust-all-details.component.scss'
})
export class ExhaustAllDetailsComponent {

}
