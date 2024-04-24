import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {combineLatestWith, merge, Observable, of, ReplaySubject, Subject, switchMap, takeUntil, tap} from "rxjs";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {TimeTrackGraphics} from "../../graphics/time/time-track-graphics";
import {ObserverTrackGraphics} from "../../graphics/observer/observer-track-graphics";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {MatDivider} from "@angular/material/divider";
import {DynamicObjectGraphics} from "../../graphics/dynamic-object-graphics";
import {VizualRxEngine, VizualRxEngineObserver} from "../../core/vizual-rx-engine";

@Component({
  selector: 'app-player-viewer',
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
  templateUrl: './player-viewer.component.html',
  styleUrl: './player-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerViewerComponent implements OnChanges, AfterViewInit, OnDestroy {

  @Input({required: true}) engine!: VizualRxEngine;

  @ViewChild('timeTrack') timeTrack!: ElementRef<SVGSVGElement>;
  @ViewChildren('observerTrack') observerTracks!: QueryList<ElementRef<SVGSVGElement>>;

  observers: VizualRxEngineObserver[];
  timeTrackGraphics?: TimeTrackGraphics;
  readonly observerTrackGraphics: Map<string, ObserverTrackGraphics>;

  private readonly engine$ = new ReplaySubject<VizualRxEngine>();
  private readonly viewInit$ = new ReplaySubject<void>();
  private readonly destroy$ = new Subject<void>();

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.observers = [];
    this.observerTrackGraphics = new Map();

    merge(
      this.getObserversFromEngine(),
      this.mergeGraphicsFromEngineAndView(),
      this.updateGraphicsFromEngine()
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnChanges(): void {
    this.engine$.next(this.engine);
  }

  ngAfterViewInit(): void {
    this.viewInit$.next();
    this.viewInit$.complete();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.timeTrackGraphics?.destroy();
    for (const graphic of this.observerTrackGraphics.values()) {
      graphic.destroy();
    }
  }

  identifyObserver(_: number, item: VizualRxEngineObserver) {
    return item.id;
  }

  private getObserversFromEngine(): Observable<unknown> {
    return this.engine$
      .pipe(
        switchMap(engine => engine.observers$),
        tap(observers => {
          this.observers = observers;
          this.changeDetectorRef.detectChanges();
        })
      );
  }

  private updateGraphicsFromEngine(): Observable<unknown> {
    return this.engine$
      .pipe(
        switchMap(engine => engine.animation$),
        combineLatestWith(DynamicObjectGraphics.timeScale$),
        tap(([time, _]) => {
          this.timeTrackGraphics?.update(time);
          this.observerTrackGraphics
            .forEach(observerTrackGraphics => observerTrackGraphics.update(time));
        })
      );
  }

  private mergeGraphicsFromEngineAndView(): Observable<unknown> {
    return this.viewInit$
      .pipe(
        switchMap(() => this.engine$),
        switchMap(engine => {
          this.mergeTimeTrackFromView(engine);
          return merge(of(undefined), this.observerTracks.changes)
            .pipe(
              tap(() => this.mergeObserverTracksFromView(engine))
            );
        })
      );
  }

  private mergeTimeTrackFromView(engine: VizualRxEngine): void {
    this.timeTrackGraphics?.destroy();
    this.timeTrackGraphics = new TimeTrackGraphics(engine, this.timeTrack.nativeElement);
    this.timeTrackGraphics.init();
  }

  private mergeObserverTracksFromView(engine: VizualRxEngine): void {
    const newElements = this.observerTracks
      .map(elementRef => elementRef.nativeElement)
      .filter(svg => {
        const id = svg.id;
        return !this.observerTrackGraphics.has(id);
      });
    newElements.forEach(newSvg => {
      const observer = this.observers.find(observer => observer.id === newSvg.id);
      if (observer) {
        const observerTrackGraphics = new ObserverTrackGraphics(engine, observer, newSvg);
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
  }
}
