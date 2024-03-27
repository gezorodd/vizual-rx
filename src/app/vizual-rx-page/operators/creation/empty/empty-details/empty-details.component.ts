import { Component } from '@angular/core';
import {AlertMessageComponent} from "../../../../../ui/alert-message/alert-message.component";

@Component({
  selector: 'app-empty-details',
  standalone: true,
  imports: [
    AlertMessageComponent
  ],
  templateUrl: './empty-details.component.html',
  styleUrl: './empty-details.component.scss'
})
export class EmptyDetailsComponent {

}
