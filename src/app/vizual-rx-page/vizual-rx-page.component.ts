import {Component, OnDestroy, OnInit} from '@angular/core';
import {VizualRxEditorComponent} from "../vizual-rx-editor/vizual-rx-editor.component";
import {VizualRxPlayer} from "../vizual-rx-player/vizual-rx-player.component";
import {VizualRxEngine} from "../core/vizual-rx-engine";
import {AppService} from "../app.service";
import {ActivatedRoute} from "@angular/router";
import {map, Subject, takeUntil, timer} from "rxjs";
import {VizualRxControllerComponent} from "../vizual-rx-controller/vizual-rx-controller.component";
import {NgComponentOutlet, NgIf} from "@angular/common";
import {Page} from "../pages/page.model";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {MatAnchor} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-vizual-rx-page',
  standalone: true,
  imports: [
    VizualRxEditorComponent,
    VizualRxPlayer,
    VizualRxControllerComponent,
    NgComponentOutlet,
    NgIf,
    MatIcon,
    MatTooltip,
    MatAnchor
  ],
  templateUrl: './vizual-rx-page.component.html',
  styleUrl: './vizual-rx-page.component.scss'
})
export class VizualRxPageComponent implements OnInit, OnDestroy {

  readonly engine: VizualRxEngine;
  page!: Page;

  private readonly destroy$ = new Subject<void>();

  constructor(vizualRxPageService: AppService, private route: ActivatedRoute) {
    this.engine = vizualRxPageService.engine;
  }

  ngOnInit(): void {
    this.route.data
      .pipe(map(data => data as Page))
      .subscribe(page => {
        this.engine.code = page.sampleCode ?? '';
        this.page = page;
        timer(500)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => this.engine.play());
      });
    this.engine.stop();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
