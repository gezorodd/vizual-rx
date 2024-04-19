import { Component } from '@angular/core';
import {AlertMessageComponent} from "../../../../../../ui/alert-message/alert-message.component";

@Component({
  selector: 'app-never-details',
  standalone: true,
    imports: [
        AlertMessageComponent
    ],
  templateUrl: './never-details.component.html',
  styleUrl: './never-details.component.scss'
})
export class NeverDetailsComponent {

}
