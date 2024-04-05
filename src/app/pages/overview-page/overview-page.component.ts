import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {filter, map, Subject, takeUntil} from "rxjs";
import {VizualRxEngine} from "../../core/vizual-rx-engine";
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";
import {VizualRxPlayerComponent} from "../../vizual-rx-player/vizual-rx-player.component";
import {miscExampleCode} from "./overview-page.model";

@Component({
  selector: 'app-overview-page',
  standalone: true,
  imports: [MatCardModule, NgIf, VizualRxPlayerComponent],
  templateUrl: './overview-page.component.html',
  styleUrl: './overview-page.component.scss'
})
export class OverviewPageComponent implements OnInit, OnDestroy {

  basicExampleEngine?: VizualRxEngine;
  createValueExampleEngine?: VizualRxEngine;
  colorAndShapeAtExampleEngine?: VizualRxEngine;
  arrayExampleEngine?: VizualRxEngine;
  miscExampleEngine?: VizualRxEngine;
  pipeExampleEngine?: VizualRxEngine;
  private readonly destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data
      .pipe(
        map(data => data['engines']),
        filter(engines => !!engines),
        map(engines => engines as Map<string, VizualRxEngine>),
        takeUntil(this.destroy$)
      )
      .subscribe(engines => {
        this.basicExampleEngine = engines.get('basicExample');
        this.createValueExampleEngine = engines.get('createValueExample');
        this.colorAndShapeAtExampleEngine = engines.get('colorAndShapeAtExample');
        this.arrayExampleEngine = engines.get('arrayExample');
        this.miscExampleEngine = engines.get('miscExample');
        this.pipeExampleEngine = engines.get('pipeExample');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}