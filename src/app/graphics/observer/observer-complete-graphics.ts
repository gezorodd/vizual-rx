import {DynamicObjectGraphics} from "../dynamic-object-graphics";
import {VizualRxScheduler} from "../../core/vizual-rx-scheduler";

export class ObserverCompleteGraphics extends DynamicObjectGraphics {

  constructor(scheduler: VizualRxScheduler) {
    super(scheduler, -1);
  }

  protected override init(groupContainer: SVGGElement): void {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.classList.add('completed-line');
    line.setAttribute('y1', '-30');
    line.setAttribute('y2', '30');
    groupContainer.appendChild(line);
  }
}
