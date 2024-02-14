import {DynamicObjectGraphics} from "../dynamic-object-graphics";

export class ObservableValueGraphics extends DynamicObjectGraphics {
  private readonly value: string;

  constructor(time: number, value: string) {
    super(time);
    this.value = value;
  }

  protected override init(groupContainer: SVGGElement): void {
    const container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    container.classList.add('observable-value');
    groupContainer.appendChild(container);

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('r', '20');
    container.appendChild(circle);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('text-anchor', 'middle');
    text.innerHTML = this.value;
    container.appendChild(text);
  }

}
