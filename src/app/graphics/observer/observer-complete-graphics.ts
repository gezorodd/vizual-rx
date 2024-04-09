import {DynamicObjectGraphics} from "../dynamic-object-graphics";
import {VizualRxScheduler} from "../../core/vizual-rx-scheduler";
import {VizualRxRemote, VizualRxRemoteNotification} from "../../remote/vizual-rx-remote.model";

export class ObserverCompleteGraphics extends DynamicObjectGraphics {

  constructor(remote: VizualRxRemote, notification: VizualRxRemoteNotification) {
    super(remote, notification.time, -1);
  }

  protected override init(groupContainer: SVGGElement): void {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.classList.add('completed-line');
    line.setAttribute('y1', '-30');
    line.setAttribute('y2', '30');
    groupContainer.appendChild(line);
  }
}
