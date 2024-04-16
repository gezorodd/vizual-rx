import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PlaygroundPageService} from "./playground-page.service";
import {VizualRxPlayerComponent} from "../../vizual-rx-player/vizual-rx-player.component";
import {catchError, noop, Subject, takeUntil, tap, throwError} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {NgComponentOutlet, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {MatAnchor} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {VizualRxRemote} from "../../remote/vizual-rx-remote.model";
import {ScriptService} from "../../script/script.service";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-playground-page',
  standalone: true,
  imports: [
    VizualRxPlayerComponent,
    NgIf,
    MatAnchor,
    MatIcon,
    MatTooltip,
    NgComponentOutlet,
    NgSwitch,
    NgSwitchCase,
    MatInput,
  ],
  templateUrl: './playground-page.component.html',
  styleUrl: './playground-page.component.scss'
})
export class PlaygroundPageComponent implements OnInit, OnDestroy {

  remote?: VizualRxRemote;
  shareState: ShareState;
  shareUrl?: string;

  @ViewChild('shareContainer') shareContainer?: ElementRef<HTMLDivElement>;

  private readonly destroy$ = new Subject<void>();

  constructor(private vizualRxPlaygroundService: PlaygroundPageService, private route: ActivatedRoute,
              private scriptsService: ScriptService) {
    this.shareState = 'not-shared';
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
    this.shareState = 'not-shared';
  }

  shareScript(): void {
    this.shareState = 'sharing';
    const createScript$ = this.scriptsService.createScript(this.vizualRxPlaygroundService.code)
      .pipe(
        tap(script => {
          this.shareState = 'shared';
          this.shareUrl = `${window.origin}/playground/${script.id}`;
          this.runShareContainerAnimation();
        }),
        catchError(err => {
          this.shareState = 'not-shared';
          return throwError(() => err);
        })
      );
    createScript$
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  copyShareUrl(): void {
    if (this.shareUrl) {
      navigator.clipboard.writeText(this.shareUrl)
        .then(noop);
    }
  }

  private runShareContainerAnimation(): void {
    const shareContainerElement = this.shareContainer?.nativeElement;
    if (shareContainerElement) {
      shareContainerElement.style.width = '0px';
      setTimeout(() => {
        shareContainerElement.style.width = '400px';
      }, 100);
      setTimeout(() => {
        shareContainerElement.style.width = 'auto';
      }, 300);
    }
  }
}

declare type ShareState = 'not-shared' | 'sharing' | 'shared';
