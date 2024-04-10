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
import {filter, interval, merge, Observable, of, Subject, switchMap, takeUntil, tap} from "rxjs";
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
export class VizualRxViewerComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input({required: true}) remote!: VizualRxRemote;

  @ViewChild('timeTrack') timeTrack!: ElementRef<SVGSVGElement>;
  @ViewChildren('observerTrack') observerTracks!: QueryList<ElementRef<SVGSVGElement>>;

  observers: VizualRxRemoteObserver[];
  timeTrackGraphics!: TimeTrackGraphics;
  readonly observerTrackGraphics: Map<string, ObserverTrackGraphics>;

  private readonly destroy$ = new Subject<void>();

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.observers = [];
    this.observerTrackGraphics = new Map();
  }

  ngOnInit(): void {
    this.remote.observers$
      .pipe(takeUntil(this.destroy$))
      .subscribe(observers => {
        this.observers = observers;
        this.changeDetectorRef.detectChanges();
      });
    this.scheduleGraphicsUpdates()
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.timeTrackGraphics = new TimeTrackGraphics(this.remote, this.timeTrack.nativeElement);
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
            const observerTrackGraphics = new ObserverTrackGraphics(this.remote, observer, newSvg);
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
    this.remote.destroy();
  }

  identifyObserver(_: number, item: VizualRxRemoteObserver) {
    return item.id;
  }

  private scheduleGraphicsUpdates(): Observable<unknown> {
    return merge(this.remote.starting$, DynamicObjectGraphics.timeScale$)
      .pipe(
        switchMap(() =>
          interval(15)
            .pipe(
              takeUntil(this.remote.stopping$)
            )
        ),
        filter(() => this.remote.playing),
        tap(() => {
          this.timeTrackGraphics?.update();
          this.observerTrackGraphics
            .forEach(observerTrackGraphics => observerTrackGraphics.update());
        }),
        takeUntil(this.destroy$)
      );
  }
}
