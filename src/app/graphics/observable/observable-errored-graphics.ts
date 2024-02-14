import {DynamicObjectGraphics} from "../dynamic-object-graphics";

export class ObservableErroredGraphics extends DynamicObjectGraphics {

  constructor(time: number) {
    super(time, -1);
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
  }
}
