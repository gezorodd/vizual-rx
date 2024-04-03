import {Component, OnDestroy, OnInit} from '@angular/core';
import {VizualRxEngine} from "../core/vizual-rx-engine";
import {VizualRxPlaygroundService} from "./vizual-rx-playground.service";
import {VizualRxPlayerComponent} from "../vizual-rx-player/vizual-rx-player.component";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-vizual-rx-playground',
  standalone: true,
  imports: [
    VizualRxPlayerComponent,
    NgIf
  ],
  templateUrl: './vizual-rx-playground.component.html',
  styleUrl: './vizual-rx-playground.component.scss'
})
export class VizualRxPlaygroundComponent implements OnInit, OnDestroy {

  engine?: VizualRxEngine;
  private readonly destroy$ = new Subject<void>();

  constructor(private vizualRxPlaygroundService: VizualRxPlaygroundService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(data => {
        this.engine = data['engines']?.get('playground');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  set code(value: string) {
    this.vizualRxPlaygroundService.code = value;
  }
}
