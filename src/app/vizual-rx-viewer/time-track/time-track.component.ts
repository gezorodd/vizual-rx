import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {VizualRxEngine} from "../../core/vizual-rx-engine";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {TimeTrackGraphics} from "../../graphics/time/time-track-graphics";

@Component({
  selector: 'app-time-track',
  standalone: true,
  imports: [
    JsonPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './time-track.component.html',
  styleUrls: ['./../vizual-rx-viewer-track.scss', './time-track.component.scss']
})
export class TimeTrackComponent implements AfterViewInit, OnDestroy {

  @Input({required: true}) engine!: VizualRxEngine;
  @ViewChild('svg') svg!: ElementRef<SVGSVGElement>;
  trackGraphics!: TimeTrackGraphics;

  ngAfterViewInit(): void {
    this.trackGraphics = new TimeTrackGraphics(this.engine, this.svg.nativeElement);
    this.trackGraphics.init();
  }

  ngOnDestroy(): void {
    this.trackGraphics.destroy();
  }
}
