import { Component } from '@angular/core';
import {AlertMessageComponent} from "../../../../../../ui/alert-message/alert-message.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-pluck-details',
  standalone: true,
  imports: [
    AlertMessageComponent,
    RouterLink
  ],
  templateUrl: './pluck-details.component.html',
  styleUrl: './pluck-details.component.scss'
})
export class PluckDetailsComponent {

}
