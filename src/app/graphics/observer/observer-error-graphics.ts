import {DynamicObjectGraphics} from "../dynamic-object-graphics";
import tippy from "tippy.js";
import {VizualRxRemote, VizualRxRemoteErrorNotification} from "../../remote/vizual-rx-remote.model";

export class ObserverErrorGraphics extends DynamicObjectGraphics {

  private readonly err: any;

  constructor(remote: VizualRxRemote, notification: VizualRxRemoteErrorNotification) {
    super(remote, notification.time);
    this.err = notification.err;
  }

  protected override init(groupContainer: SVGGElement): void {
    const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    image.classList.add('error-icon')
    image.setAttribute('x', '-25');
    image.setAttribute('y', '-25');
    image.setAttribute('width', '50');
    image.setAttribute('height', '50');
    image.setAttribute('href', 'assets/dangerous_black_24dp.svg');
    image.setAttribute('filter', 'url(#error-color)')
    groupContainer.appendChild(image);

    if (this.err) {
      tippy(groupContainer, {
        content: this.err.toString(),
        placement: 'bottom',
        animation: 'scale',
        inertia: true
      });
    }
  }
}
