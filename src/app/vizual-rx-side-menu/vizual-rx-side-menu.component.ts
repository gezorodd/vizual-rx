import {Component} from '@angular/core';
import {MatListItem, MatListOption, MatSelectionList, MatSelectionListChange} from "@angular/material/list";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NavigationEnd, Router} from "@angular/router";
import {filter, map, noop, Observable} from "rxjs";
import {FormsModule} from "@angular/forms";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-vizual-rx-side-menu',
  standalone: true,
  imports: [
    MatListOption,
    MatListItem,
    MatSelectionList,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './vizual-rx-side-menu.component.html',
  styleUrl: './vizual-rx-side-menu.component.scss'
})
export class VizualRxSideMenuComponent {

  currentUrl?: string;

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => {
          const navigationEnd = event as NavigationEnd;
          return navigationEnd.url;
        })
      ).subscribe(currentUrl => this.currentUrl = currentUrl);
  }

  navigateTo(change: MatSelectionListChange): void {
    const route = change.options[0]?.value;
    if (route) {
      this.router.navigate([route])
        .then(r => noop());
    }
  }
}
