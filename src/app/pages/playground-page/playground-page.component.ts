import {Component, OnDestroy, OnInit} from '@angular/core';
import {VizualRxEngine} from "../../core/vizual-rx-engine";
import {PlaygroundPageService} from "./playground-page.service";
import {VizualRxPlayerComponent} from "../../vizual-rx-player/vizual-rx-player.component";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-playground-page',
  standalone: true,
  imports: [
    VizualRxPlayerComponent,
    NgIf
  ],
  templateUrl: './playground-page.component.html',
  styleUrl: './playground-page.component.scss'
})
export class PlaygroundPageComponent implements OnInit, OnDestroy {

  engine?: VizualRxEngine;
  private readonly destroy$ = new Subject<void>();

  constructor(private vizualRxPlaygroundService: PlaygroundPageService, private route: ActivatedRoute) {
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