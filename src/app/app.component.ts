import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {VizualRxPlayer} from "./vizual-rx-player/vizual-rx-player.component";
import {VizualRxEditorComponent} from "./vizual-rx-editor/vizual-rx-editor.component";
import {VizualRxSidenavComponent} from "./vizual-rx-sidenav/vizual-rx-sidenav.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {BehaviorSubject} from "rxjs";
import {AppService} from "./app.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, VizualRxPlayer, VizualRxEditorComponent, VizualRxSidenavComponent, MatToolbar, MatIcon, MatIconButton, MatDrawerContainer, MatDrawer, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  readonly sidenavOpenedState$: BehaviorSubject<boolean>;

  constructor(private appService: AppService) {
    this.sidenavOpenedState$ = appService.sidenavOpenedState$;
  }

  toggleSidenav(): void {
    this.sidenavOpenedState$.next(!this.sidenavOpenedState$.value);
  }

  sidenavOpenedChanged(): void {
    this.appService.sidenavOpenedChanged$.next();
  }
}
