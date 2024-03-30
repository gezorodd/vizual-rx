import { Component } from '@angular/core';
import {AlertMessageComponent} from "../../../../../ui/alert-message/alert-message.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-map-to-details',
  standalone: true,
  imports: [
    AlertMessageComponent,
    RouterLink
  ],
  templateUrl: './map-to-details.component.html',
  styleUrl: './map-to-details.component.scss'
})
export class MapToDetailsComponent {

}
