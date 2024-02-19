import {DynamicObjectGraphics} from "../dynamic-object-graphics";

export class ObserverNextGraphics extends DynamicObjectGraphics {
  private readonly value: string;

  constructor(value: string) {
    super();
    this.value = value;
  }

  protected override init(groupContainer: SVGGElement): void {
    const container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    container.classList.add('observer-value');
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
