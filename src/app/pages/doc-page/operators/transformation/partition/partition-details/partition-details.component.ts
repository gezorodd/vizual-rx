import { Component } from '@angular/core';
import {AlertMessageComponent} from "../../../../../../ui/alert-message/alert-message.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-partition-details',
  standalone: true,
  imports: [
    AlertMessageComponent,
    RouterLink
  ],
  templateUrl: './partition-details.component.html',
  styleUrl: './partition-details.component.scss'
})
export class PartitionDetailsComponent {

}
