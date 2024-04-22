import {DynamicObjectGraphics} from "../dynamic-object-graphics";

import {VizualRxRemoteNotification} from "../../core/vizual-rx-engine";

export class ObserverCompleteGraphics extends DynamicObjectGraphics {

  constructor(notification: VizualRxRemoteNotification) {
    super(notification.time, -1);
  }

  protected override init(groupContainer: SVGGElement): void {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.classList.add('completed-line');
    line.setAttribute('y1', '-30');
    line.setAttribute('y2', '30');
    groupContainer.appendChild(line);
  }
}
