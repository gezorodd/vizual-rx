import {Component} from '@angular/core';
import {
  NavigationEnd,
  NavigationError,
  NavigationSkipped,
  NavigationStart,
  Router,
  RouterOutlet
} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {PlayerViewerComponent} from "./player/player-viewer/player-viewer.component";
import {PlayerEditorComponent} from "./player/player-editor/player-editor.component";
import {SidenavComponent} from "./sidenav/sidenav.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {BehaviorSubject, distinctUntilChanged, filter, map, Observable, take} from "rxjs";
import {AppService} from "./app.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatTooltip} from "@angular/material/tooltip";
import {LoadingAnimationComponent} from "./ui/loading-animation/loading-animation.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, PlayerViewerComponent, PlayerEditorComponent, SidenavComponent, MatToolbar, MatIcon, MatIconButton, MatDrawerContainer, MatDrawer, AsyncPipe, MatProgressBar, MatTooltip, NgIf, LoadingAnimationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  readonly sidenavOpenedState$: BehaviorSubject<boolean>;
  readonly loading$: Observable<boolean>;
  readonly initialized$: Observable<boolean>;

  constructor(private appService: AppService, router: Router) {
    this.sidenavOpenedState$ = appService.sidenavOpenedState$;
    this.loading$ = router.events
      .pipe(
        map(event => {
          if (event instanceof NavigationStart) {
            return true;
          } else if (event instanceof NavigationEnd || event instanceof NavigationSkipped || event instanceof NavigationError) {
            return false;
          }
          return undefined;
        }),
        filter(loading => loading !== undefined),
        map(loading => !!loading)
      )
    ;
    this.initialized$ = this.loading$
      .pipe(
        map(loading => !loading),
        distinctUntilChanged(),
        take(2)
      );
  }

  toggleSidenav()
    :
    void {
    this.sidenavOpenedState$.next(!this.sidenavOpenedState$.value);
  }

  sidenavOpenedChanged()
    :
    void {
    this.appService.sidenavOpenedChanged$.next();
  }
}
