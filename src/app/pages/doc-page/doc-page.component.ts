import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil, timer} from "rxjs";
import {NgComponentOutlet, NgIf} from "@angular/common";
import {DocPage} from "./doc-page.model";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {MatAnchor} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {PlayerComponent} from "../../player/player.component";

import {VizualRxEngine} from "../../core/vizual-rx-engine";

@Component({
  selector: 'app-doc-page',
  standalone: true,
  imports: [
    NgComponentOutlet,
    NgIf,
    MatIcon,
    MatTooltip,
    MatAnchor,
    PlayerComponent,
    MatCardModule
  ],
  templateUrl: './doc-page.component.html',
  styleUrl: './doc-page.component.scss'
})
export class DocPageComponent implements OnInit, AfterViewInit, OnDestroy {

  engine?: VizualRxEngine;
  page!: DocPage;
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
