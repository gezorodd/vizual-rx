import {Component} from '@angular/core';
import {NavigationEnd, NavigationSkipped, NavigationStart, Router, RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {VizualRxPlayer} from "./vizual-rx-player/vizual-rx-player.component";
import {VizualRxEditorComponent} from "./vizual-rx-editor/vizual-rx-editor.component";
import {VizualRxSidenavComponent} from "./vizual-rx-sidenav/vizual-rx-sidenav.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {BehaviorSubject, filter, map, Observable} from "rxjs";
import {AppService} from "./app.service";
import {AsyncPipe} from "@angular/common";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, VizualRxPlayer, VizualRxEditorComponent, VizualRxSidenavComponent, MatToolbar, MatIcon, MatIconButton, MatDrawerContainer, MatDrawer, AsyncPipe, MatProgressBar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  readonly sidenavOpenedState$: BehaviorSubject<boolean>;
  readonly loading$: Observable<boolean>;

  constructor(private appService: AppService, router: Router) {
    this.sidenavOpenedState$ = appService.sidenavOpenedState$;
    this.loading$ = router.events
      .pipe(
        map(event => {
          if (event instanceof NavigationStart) {
            return true;
          } else if (event instanceof NavigationEnd || event instanceof NavigationSkipped) {
            return false;
          }
          return undefined;
        }),
        filter(loading => loading !== undefined),
        map(loading => !!loading)
      );
  }

  toggleSidenav(): void {
    this.sidenavOpenedState$.next(!this.sidenavOpenedState$.value);
  }

  sidenavOpenedChanged(): void {
    this.appService.sidenavOpenedChanged$.next();
  }
}
