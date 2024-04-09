import {DynamicObjectGraphics} from "../dynamic-object-graphics";
import {VizualRxScheduler} from "../../core/vizual-rx-scheduler";
import {VizualRxEngine, VizualRxNotification} from "../../engine/vizual-rx-engine.model";

export class ObserverCompleteGraphics extends DynamicObjectGraphics {

  constructor(engine: VizualRxEngine, notification: VizualRxNotification) {
    super(engine, notification.time, -1);
  }

  protected override init(groupContainer: SVGGElement): void {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.classList.add('completed-line');
    line.setAttribute('y1', '-30');
    line.setAttribute('y2', '30');
    groupContainer.appendChild(line);
  }
}
