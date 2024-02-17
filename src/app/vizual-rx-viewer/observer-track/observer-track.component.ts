import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {VizualRxEngine} from "../../core/vizual-rx-engine";
import {ObserverTrackGraphics} from "../../graphics/observer/observer-track-graphics";
import {VizualRxObserver} from "../../core/vizual-rx-observer";

@Component({
  selector: 'app-observer-track',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './observer-track.component.html',
  styleUrls: ['./../vizual-rx-viewer-track.scss', './observer-track.component.scss']
})
export class ObserverTrackComponent implements AfterViewInit, OnDestroy {

  @Input({required: true}) engine!: VizualRxEngine;
  @Input({required: true}) observer!: VizualRxObserver;
  @ViewChild('svg') svg!: ElementRef<SVGSVGElement>;
  trackGraphics!: ObserverTrackGraphics;

  ngAfterViewInit(): void {
    this.trackGraphics = new ObserverTrackGraphics(this.engine, this.observer, this.svg.nativeElement);
    this.trackGraphics.init();
  }

  ngOnDestroy(): void {
    this.trackGraphics.destroy();
  }
}
