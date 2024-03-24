import {Component, OnDestroy, OnInit, Type} from '@angular/core';
import {VizualRxEditorComponent} from "../vizual-rx-editor/vizual-rx-editor.component";
import {VizualRxPlayer} from "../vizual-rx-player/vizual-rx-player.component";
import {VizualRxEngine} from "../core/vizual-rx-engine";
import {AppService} from "../app.service";
import {ActivatedRoute} from "@angular/router";
import {map, Subject, takeUntil, timer} from "rxjs";
import {VizualRxControllerComponent} from "../vizual-rx-controller/vizual-rx-controller.component";
import {NgComponentOutlet, NgIf} from "@angular/common";
import {Page} from "../pages/page";

@Component({
  selector: 'app-vizual-rx-page',
  standalone: true,
  imports: [
    VizualRxEditorComponent,
    VizualRxPlayer,
    VizualRxControllerComponent,
    NgComponentOutlet,
    NgIf
  ],
  templateUrl: './vizual-rx-page.component.html',
  styleUrl: './vizual-rx-page.component.scss'
})
export class VizualRxPageComponent implements OnInit, OnDestroy {

  readonly engine: VizualRxEngine;
  title?: string;
  detailComponent?: Type<any>;

  private readonly destroy$ = new Subject<void>();

  constructor(vizualRxPageService: AppService, private route: ActivatedRoute) {
    this.engine = vizualRxPageService.engine;
  }

  ngOnInit(): void {
    this.route.data
      .pipe(map(data => data as Page))
      .subscribe(data => {
        this.engine.code = data.sampleCode ?? '';
        this.title = data.title;
        this.detailComponent = data.detailsComponent;
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
