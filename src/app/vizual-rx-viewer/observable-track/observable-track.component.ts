import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {VizualRxEngine} from "../../core/vizual-rx-engine";
import {ObservableTrackGraphics} from "../../graphics/observable/observable-track-graphics";
import {VizualRxObservable} from "../../core/vizual-rx-observable";

@Component({
  selector: 'app-observable-track',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './observable-track.component.html',
  styleUrls: ['./../vizual-rx-viewer-track.scss', './observable-track.component.scss']
})
export class ObservableTrackComponent implements AfterViewInit, OnDestroy {

  @Input({required: true}) engine!: VizualRxEngine;
  @Input({required: true}) observable!: VizualRxObservable;
  @ViewChild('svg') svg!: ElementRef<SVGSVGElement>;
  trackGraphics!: ObservableTrackGraphics;

  ngAfterViewInit(): void {
    this.trackGraphics = new ObservableTrackGraphics(this.engine, this.observable, this.svg.nativeElement);
    this.trackGraphics.init();
  }

  ngOnDestroy(): void {
    this.trackGraphics.destroy();
  }
}
