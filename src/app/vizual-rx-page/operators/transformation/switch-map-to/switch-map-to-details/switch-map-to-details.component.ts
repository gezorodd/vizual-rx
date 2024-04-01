import { Component } from '@angular/core';
import {AlertMessageComponent} from "../../../../../ui/alert-message/alert-message.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-switch-map-to-details',
  standalone: true,
  imports: [
    AlertMessageComponent,
    RouterLink
  ],
  templateUrl: './switch-map-to-details.component.html',
  styleUrl: './switch-map-to-details.component.scss'
})
export class SwitchMapToDetailsComponent {

}
