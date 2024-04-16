import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {ScriptNotFoundError} from "../../script/script.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-error-page',
  standalone: true,
  templateUrl: './error-page.component.html',
  imports: [
    MatButton,
    NgIf,
    RouterLink
  ],
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent implements OnInit {

  isNotFound: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.isNotFound = false;
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      const error = state['error'];
      if (error && error instanceof ScriptNotFoundError) {
        this.isNotFound = true;
      }
    }
  }

  ngOnInit(): void {
    this.route.data
      .subscribe(data => {
        const error = data['error'];
        if (error === 404) {
          this.isNotFound = true;
        }
      });
  }
}
