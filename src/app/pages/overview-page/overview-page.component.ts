import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {filter, map, Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";
import {VizualRxPlayerComponent} from "../../vizual-rx-player/vizual-rx-player.component";
import {VizualRxRemote} from "../../remote/vizual-rx-remote.model";

@Component({
  selector: 'app-overview-page',
  standalone: true,
  imports: [MatCardModule, NgIf, VizualRxPlayerComponent],
  templateUrl: './overview-page.component.html',
  styleUrl: './overview-page.component.scss'
})
export class OverviewPageComponent implements OnInit, OnDestroy {

  basicExampleRemote?: VizualRxRemote;
  createValueExampleRemote?: VizualRxRemote;
  colorAndShapeAtExampleRemote?: VizualRxRemote;
  arrayExampleRemote?: VizualRxRemote;
  miscExampleRemote?: VizualRxRemote;
  pipeExampleRemote?: VizualRxRemote;
  private readonly destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data
      .pipe(
        map(data => data['remotes']),
        filter(remotes => !!remotes),
        map(remotes => remotes as Map<string, VizualRxRemote>),
        takeUntil(this.destroy$)
      )
      .subscribe(remotes => {
        this.basicExampleRemote = remotes.get('basicExample');
        this.createValueExampleRemote = remotes.get('createValueExample');
        this.colorAndShapeAtExampleRemote = remotes.get('colorAndShapeAtExample');
        this.arrayExampleRemote = remotes.get('arrayExample');
        this.miscExampleRemote = remotes.get('miscExample');
        this.pipeExampleRemote = remotes.get('pipeExample');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
