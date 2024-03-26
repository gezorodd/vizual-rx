import {Component, OnDestroy, OnInit} from '@angular/core';
import {VizualRxEditorComponent} from "../vizual-rx-editor/vizual-rx-editor.component";
import {VizualRxPlayer} from "../vizual-rx-player/vizual-rx-player.component";
import {VizualRxEngine} from "../core/vizual-rx-engine";
import {AppService} from "../app.service";
import {ActivatedRoute} from "@angular/router";
import {map, Subject, takeUntil, tap, timer} from "rxjs";
import {VizualRxControllerComponent} from "../vizual-rx-controller/vizual-rx-controller.component";
import {NgComponentOutlet, NgIf} from "@angular/common";
import {Page} from "../pages/page.model";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {MatAnchor} from "@angular/material/button";
import {VizualRxPageService} from "./vizual-rx-page.service";
import {playgroundPage} from "../pages/playground/playground.page";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

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
    MatAnchor,
    MatProgressSpinner
  ],
  templateUrl: './vizual-rx-page.component.html',
  styleUrl: './vizual-rx-page.component.scss'
})
export class VizualRxPageComponent implements OnInit, OnDestroy {

  readonly engine: VizualRxEngine;
  page!: Page;
  loading: boolean;

  private readonly destroy$ = new Subject<void>();

  constructor(vizualRxPageService: AppService, private route: ActivatedRoute, private rxPageService: VizualRxPageService) {
    this.engine = vizualRxPageService.engine;
    this.loading = true;
  }

  ngOnInit(): void {
    this.route.data
      .pipe(map(data => data as Page))
      .subscribe(page => {
        this.page = page;
        if (this.isPlayground) {
          this.engine.code = this.rxPageService.playgroundCode;
        } else {
          this.engine.code = page.sampleCode ?? '';
        }
        timer(500)
          .pipe(
            tap(() => this.loading = false),
            takeUntil(this.destroy$)
          )
          .subscribe(() => this.engine.play());
      });
    this.engine.stop();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCodeChange(code: string) {
    if (this.isPlayground) {
      this.rxPageService.playgroundCode = code;
    }
  }

  private get isPlayground(): boolean {
    return this.page.routeUrl === playgroundPage.routeUrl;
  }
}
