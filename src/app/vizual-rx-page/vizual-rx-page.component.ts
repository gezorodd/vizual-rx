import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {VizualRxEditorComponent} from "../vizual-rx-editor/vizual-rx-editor.component";
import {VizualRxViewerComponent} from "../vizual-rx-viewer/vizual-rx-viewer.component";
import {VizualRxEngine} from "../core/vizual-rx-engine";
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil, timer} from "rxjs";
import {VizualRxControllerComponent} from "../vizual-rx-controller/vizual-rx-controller.component";
import {NgComponentOutlet, NgIf} from "@angular/common";
import {Page} from "./vizual-rx-page.model";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {MatAnchor} from "@angular/material/button";
import {AlertMessageComponent} from "../ui/alert-message/alert-message.component";
import {VizualRxPlayerComponent} from "../vizual-rx-player/vizual-rx-player.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-vizual-rx-page',
  standalone: true,
  imports: [
    VizualRxEditorComponent,
    VizualRxViewerComponent,
    VizualRxControllerComponent,
    NgComponentOutlet,
    NgIf,
    MatIcon,
    MatTooltip,
    MatAnchor,
    AlertMessageComponent,
    VizualRxPlayerComponent,
    MatCardModule
  ],
  templateUrl: './vizual-rx-page.component.html',
  styleUrl: './vizual-rx-page.component.scss'
})
export class VizualRxPageComponent implements OnInit, AfterViewInit, OnDestroy {

  engine?: VizualRxEngine;
  page!: Page;
  private readonly destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(data => {
        this.page = data['page'];
        this.engine = data['engines']?.get('page');
      });
  }

  ngAfterViewInit(): void {
    timer(0)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.engine?.play());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
