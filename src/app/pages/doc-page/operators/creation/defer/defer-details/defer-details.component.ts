import { Component } from '@angular/core';
import {AlertMessageComponent} from "../../../../../../ui/alert-message/alert-message.component";

@Component({
  selector: 'app-defer-details',
  standalone: true,
  imports: [
    AlertMessageComponent
  ],
  templateUrl: './defer-details.component.html',
  styleUrl: './defer-details.component.scss'
})
export class DeferDetailsComponent {

}
