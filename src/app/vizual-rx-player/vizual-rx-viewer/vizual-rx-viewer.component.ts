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
import {filter, interval, map, merge, Observable, of, ReplaySubject, Subject, switchMap, takeUntil, tap} from "rxjs";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {TimeTrackGraphics} from "../../graphics/time/time-track-graphics";
import {ObserverTrackGraphics} from "../../graphics/observer/observer-track-graphics";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {MatDivider} from "@angular/material/divider";
import {VizualRxRemote, VizualRxRemoteObserver} from "../../remote/vizual-rx-remote.model";
import {DynamicObjectGraphics} from "../../graphics/dynamic-object-graphics";

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
export class VizualRxViewerComponent implements OnChanges, AfterViewInit, OnDestroy {

  @Input({required: true}) remote!: VizualRxRemote;

  @ViewChild('timeTrack') timeTrack!: ElementRef<SVGSVGElement>;
  @ViewChildren('observerTrack') observerTracks!: QueryList<ElementRef<SVGSVGElement>>;

  observers: VizualRxRemoteObserver[];
  timeTrackGraphics?: TimeTrackGraphics;
  readonly observerTrackGraphics: Map<string, ObserverTrackGraphics>;

  private readonly remote$ = new ReplaySubject<VizualRxRemote>();
  private readonly viewInit$ = new ReplaySubject<void>();
  private readonly destroy$ = new Subject<void>();

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.observers = [];
    this.observerTrackGraphics = new Map();

    merge(
      this.getObserversFromRemote(),
      this.mergeGraphicsFromRemoteAndView(),
      this.updateGraphicsFromRemoteEvents()
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnChanges(): void {
    this.remote$.next(this.remote);
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

  identifyObserver(_: number, item: VizualRxRemoteObserver) {
    return item.id;
  }

  private getObserversFromRemote(): Observable<unknown> {
    return this.remote$
      .pipe(
        switchMap(remote => remote.observers$),
        tap(observers => {
          this.observers = observers;
          this.changeDetectorRef.detectChanges();
        })
      );
  }

  private updateGraphicsFromRemoteEvents(): Observable<unknown> {
    return this.remote$
      .pipe(
        switchMap(remote =>
          merge(remote.starting$, DynamicObjectGraphics.timeScale$)
            .pipe(map(() => remote))
        ),
        switchMap(remote =>
          interval(15)
            .pipe(
              map(() => remote),
              takeUntil(remote.stopping$)
            )
        ),
        filter(remote => remote.playing),
        tap(() => {
          this.timeTrackGraphics?.update();
          this.observerTrackGraphics
            .forEach(observerTrackGraphics => observerTrackGraphics.update());
        })
      )
  }

  private mergeGraphicsFromRemoteAndView(): Observable<unknown> {
    return this.viewInit$
      .pipe(
        switchMap(() => this.remote$),
        switchMap(remote => {
          this.mergeTimeTrackFromView(remote);
          return merge(of(undefined), this.observerTracks.changes)
            .pipe(
              tap(() => this.mergeObserverTracksFromView(remote))
            );
        })
      );
  }

  private mergeTimeTrackFromView(remote: VizualRxRemote): void {
    this.timeTrackGraphics?.destroy();
    this.timeTrackGraphics = new TimeTrackGraphics(remote, this.timeTrack.nativeElement);
    this.timeTrackGraphics.init();
  }

  private mergeObserverTracksFromView(remote: VizualRxRemote): void {
    const newElements = this.observerTracks
      .map(elementRef => elementRef.nativeElement)
      .filter(svg => {
        const id = svg.id;
        return !this.observerTrackGraphics.has(id);
      });
    newElements.forEach(newSvg => {
      const observer = this.observers.find(observer => observer.id === newSvg.id);
      if (observer) {
        console.log('create obs track')
        const observerTrackGraphics = new ObserverTrackGraphics(remote, observer, newSvg);
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
