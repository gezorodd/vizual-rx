import { Component } from '@angular/core';
import {AlertMessageComponent} from "../../../../../ui/alert-message/alert-message.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-concat-map-to-details',
  standalone: true,
  imports: [
    AlertMessageComponent,
    RouterLink
  ],
  templateUrl: './concat-map-to-details.component.html',
  styleUrl: './concat-map-to-details.component.scss'
})
export class ConcatMapToDetailsComponent {

}
