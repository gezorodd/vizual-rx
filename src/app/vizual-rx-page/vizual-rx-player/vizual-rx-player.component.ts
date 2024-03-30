import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {merge, of, Subject, takeUntil} from "rxjs";
import {VizualRxEngine} from "../../core/vizual-rx-engine";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {VizualRxObserver} from "../../core/vizual-rx-observer";
import {TimeTrackGraphics} from "../../graphics/time/time-track-graphics";
import {ObserverTrackGraphics} from "../../graphics/observer/observer-track-graphics";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {MatDivider} from "@angular/material/divider";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-vizual-rx-player',
  standalone: true,
  imports: [
    NgForOf,
    JsonPipe,
    MatIcon,
    MatMiniFabButton,
    MatButton,
    AsyncPipe,
    NgIf,
    FormsModule,
    MatSlider,
    MatSliderThumb,
    MatDivider
  ],
  templateUrl: './vizual-rx-player.component.html',
  styleUrl: './vizual-rx-player.component.scss'
})
export class VizualRxPlayer implements OnInit, AfterViewInit, OnDestroy {

  engine: VizualRxEngine;

  @ViewChild('timeTrack') timeTrack!: ElementRef<SVGSVGElement>;
  @ViewChildren('observerTrack') observerTracks!: QueryList<ElementRef<SVGSVGElement>>;

  observers: VizualRxObserver[];
  timeTrackGraphics!: TimeTrackGraphics;
  observerTrackGraphics: Map<string, ObserverTrackGraphics>;

  private readonly destroy$ = new Subject<void>();

  constructor(appService: AppService) {
    this.engine = appService.engine;
    this.observers = [];
    this.observerTrackGraphics = new Map();
  }

  ngOnInit(): void {
    this.engine.starting$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.observers = this.engine.observers);
  }

  ngAfterViewInit(): void {
    this.timeTrackGraphics = new TimeTrackGraphics(this.engine, this.timeTrack.nativeElement);
    this.timeTrackGraphics.init();

    merge(of(undefined), this.observerTracks.changes)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        const newElements = this.observerTracks
          .map(elementRef => elementRef.nativeElement)
          .filter(svg => {
            const id = svg.id;
            return !this.observerTrackGraphics.has(id);
          });
        newElements.forEach(newSvg => {
          const observer = this.observers.find(observer => observer.id === newSvg.id);
          if (observer) {
            const observerTrackGraphics = new ObserverTrackGraphics(this.engine, observer, newSvg);
            observerTrackGraphics.init();
            this.observerTrackGraphics.set(observer.id, observerTrackGraphics);
          }
        });

        const svgIds = this.observerTracks
          .map(elementRef => elementRef.nativeElement)
          .map(svg => svg.id);
        const outDatedGraphics = [...this.observerTrackGraphics.keys()]
          .filter(id1 => svgIds.findIndex(id2 => id2 === id1) === -1)
          .map(id => this.observerTrackGraphics.get(id) as ObserverTrackGraphics);
        outDatedGraphics.forEach(graphics => graphics.destroy());
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.timeTrackGraphics.destroy();
    for (const graphic of this.observerTrackGraphics.values()) {
      graphic.destroy();
    }
  }
}
