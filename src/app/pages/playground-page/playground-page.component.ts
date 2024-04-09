import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlaygroundPageService} from "./playground-page.service";
import {VizualRxPlayerComponent} from "../../vizual-rx-player/vizual-rx-player.component";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {NgComponentOutlet, NgIf} from "@angular/common";
import {MatAnchor} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {VizualRxRemote} from "../../remote/vizual-rx-remote.model";

@Component({
  selector: 'app-playground-page',
  standalone: true,
    imports: [
        VizualRxPlayerComponent,
        NgIf,
        MatAnchor,
        MatIcon,
        MatTooltip,
        NgComponentOutlet
    ],
  templateUrl: './playground-page.component.html',
  styleUrl: './playground-page.component.scss'
})
export class PlaygroundPageComponent implements OnInit, OnDestroy {

  remote?: VizualRxRemote;
  private readonly destroy$ = new Subject<void>();

  constructor(private vizualRxPlaygroundService: PlaygroundPageService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(data => {
        this.remote = data['remotes']?.get('playground');
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
