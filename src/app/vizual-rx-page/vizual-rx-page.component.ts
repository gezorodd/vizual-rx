import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {VizualRxEditorComponent} from "./vizual-rx-editor/vizual-rx-editor.component";
import {VizualRxPlayer} from "./vizual-rx-player/vizual-rx-player.component";
import {VizualRxEngine} from "../core/vizual-rx-engine";
import {AppService} from "../app.service";
import {ActivatedRoute} from "@angular/router";
import {map, Subject, takeUntil, timer} from "rxjs";
import {VizualRxControllerComponent} from "./vizual-rx-controller/vizual-rx-controller.component";
import {NgComponentOutlet, NgIf} from "@angular/common";
import {Page} from "./vizual-rx-page.model";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {MatAnchor} from "@angular/material/button";
import {VizualRxPageService} from "./vizual-rx-page.service";
import {AlertMessageComponent} from "../ui/alert-message/alert-message.component";
import {playgroundPage} from "./vizual-rx/playground/playground.page";

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
    AlertMessageComponent
  ],
  templateUrl: './vizual-rx-page.component.html',
  styleUrl: './vizual-rx-page.component.scss'
})
export class VizualRxPageComponent implements OnInit, AfterViewInit, OnDestroy {

  readonly engine: VizualRxEngine;
  page!: Page;

  private readonly destroy$ = new Subject<void>();
  private _code: string;

  constructor(vizualRxPageService: AppService, private route: ActivatedRoute, private rxPageService: VizualRxPageService) {
    this.engine = vizualRxPageService.engine;
    this._code = '';
  }

  ngOnInit(): void {
    this.engine.stop();
    this.route.data
      .pipe(
        map(data => data as Page),
        takeUntil(this.destroy$)
      )
      .subscribe(page => this.page = page);
    this._code = this.engine.code;
  }

  ngAfterViewInit(): void {
    timer(0)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.engine.play());
  }

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this.engine.code = value;
    this._code = value;
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
