import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {merge, of, Subject, takeUntil} from "rxjs";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {VizualRxCoreObserver} from "../../core/vizual-rx-core-observer";
import {TimeTrackGraphics} from "../../graphics/time/time-track-graphics";
import {ObserverTrackGraphics} from "../../graphics/observer/observer-track-graphics";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {MatDivider} from "@angular/material/divider";
import {VizualRxEngine, VizualRxObserver} from "../../engine/vizual-rx-engine.model";

@Component({
  selector: 'app-vizual-rx-viewer',
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
  templateUrl: './vizual-rx-viewer.component.html',
  styleUrl: './vizual-rx-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VizualRxViewerComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input({required: true}) engine!: VizualRxEngine;

  @ViewChild('timeTrack') timeTrack!: ElementRef<SVGSVGElement>;
  @ViewChildren('observerTrack') observerTracks!: QueryList<ElementRef<SVGSVGElement>>;

  observers: VizualRxObserver[];
  timeTrackGraphics!: TimeTrackGraphics;
  observerTrackGraphics: Map<string, ObserverTrackGraphics>;

  private readonly destroy$ = new Subject<void>();

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.observers = [];
    this.observerTrackGraphics = new Map();
  }

  ngOnInit(): void {
    this.engine.observers$
      .pipe(takeUntil(this.destroy$))
      .subscribe(observers => {
        this.observers = observers;
        this.changeDetectorRef.detectChanges();
      });
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
    this.engine.destroy();
  }

  identifyObserver(_: number, item: VizualRxObserver) {
    return item.id;
  }
}
