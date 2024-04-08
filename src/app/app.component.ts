import {Component} from '@angular/core';
import {NavigationEnd, NavigationSkipped, NavigationStart, Router, RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {VizualRxViewerComponent} from "./vizual-rx-player/vizual-rx-viewer/vizual-rx-viewer.component";
import {VizualRxEditorComponent} from "./vizual-rx-player/vizual-rx-editor/vizual-rx-editor.component";
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
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, VizualRxViewerComponent, VizualRxEditorComponent, SidenavComponent, MatToolbar, MatIcon, MatIconButton, MatDrawerContainer, MatDrawer, AsyncPipe, MatProgressBar, MatTooltip, MatProgressSpinner, NgIf],
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
          } else if (event instanceof NavigationEnd || event instanceof NavigationSkipped) {
            return false;
          }
          return undefined;
        }),
        filter(loading => loading !== undefined),
        map(loading => !!loading)
      );
    this.initialized$ = this.loading$
      .pipe(
        map(loading => !loading),
        distinctUntilChanged(),
        take(2)
      );

    if (typeof Worker !== 'undefined') {
      const test = new Test();
      // Create a new
      const worker = new Worker(new URL('./engine/vizual-rx-engine.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        console.log(`page got message: ${data}`);
      };
      worker.postMessage({t: 'test'});
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  toggleSidenav(): void {
    this.sidenavOpenedState$.next(!this.sidenavOpenedState$.value);
  }

  sidenavOpenedChanged(): void {
    this.appService.sidenavOpenedChanged$.next();
  }
}

export class Test {

  test() {
    console.log('this is a test');
  }
}
