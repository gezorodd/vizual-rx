import { Component } from '@angular/core';
import {AlertMessageComponent} from "../../../../../../ui/alert-message/alert-message.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-exhaust-details',
  standalone: true,
  imports: [
    AlertMessageComponent,
    RouterLink
  ],
  templateUrl: './exhaust-details.component.html',
  styleUrl: './exhaust-details.component.scss'
})
export class ExhaustDetailsComponent {

}
