import { Component } from '@angular/core';
import {AlertMessageComponent} from "../../../../../ui/alert-message/alert-message.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-merge-map-to-details',
  standalone: true,
  imports: [
    AlertMessageComponent,
    RouterLink
  ],
  templateUrl: './merge-map-to-details.component.html',
  styleUrl: './merge-map-to-details.component.scss'
})
export class MergeMapToDetailsComponent {

}
