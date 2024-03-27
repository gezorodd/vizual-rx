import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatCard, MatCardContent} from "@angular/material/card";
import {AlertMessageComponent} from "../../../ui/alert-message/alert-message.component";

@Component({
  selector: 'app-combine-all-details',
  standalone: true,
  imports: [
    RouterLink,
    MatCard,
    MatCardContent,
    AlertMessageComponent
  ],
  templateUrl: './combine-all-details.component.html',
  styleUrl: './combine-all-details.component.scss'
})
export class CombineAllDetailsComponent {

}
