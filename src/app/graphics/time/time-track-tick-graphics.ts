import {DynamicObjectGraphics} from "../dynamic-object-graphics";

export class TimeTrackTickGraphics extends DynamicObjectGraphics {
  sequence: number

  constructor(sequence: number) {
    super();
    this.sequence = sequence;
  }

  protected override init(groupContainer: SVGGElement): void {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('y1', '-8');
    line.setAttribute('y2', '8');
    groupContainer.appendChild(line);


    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('y', '-15');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('text-anchor', 'middle');
    text.innerHTML = `${this.sequence}s`;
    groupContainer.appendChild(text);
  }
}
