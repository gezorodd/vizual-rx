import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatCard, MatCardContent} from "@angular/material/card";

@Component({
  selector: 'app-combine-all-details',
  standalone: true,
  imports: [
    RouterLink,
    MatCard,
    MatCardContent
  ],
  templateUrl: './combine-all-details.component.html',
  styleUrl: './combine-all-details.component.scss'
})
export class CombineAllDetailsComponent {

}
