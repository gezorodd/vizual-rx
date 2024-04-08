import {DynamicObjectGraphics} from "../dynamic-object-graphics";
import {VizualRxScheduler} from "../../core/vizual-rx-scheduler";

export class TimeTrackTickGraphics extends DynamicObjectGraphics {
  sequence: number

  constructor(scheduler: VizualRxScheduler, sequence: number) {
    super(scheduler);
    this.sequence = sequence;
  }

  protected override init(groupContainer: SVGGElement): void {
    if (this.sequence % 1 === 0) {
      this.drawSecondTick(groupContainer);
    } else if (this.sequence % 0.5 === 0) {
      this.drawHalfSecondThick(groupContainer);
    } else {
      this.drawTenthOfSecondThick(groupContainer);
    }
  }

  private drawSecondTick(groupContainer: SVGGElement) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.classList.add('second-thick');
    line.setAttribute('y1', '-20');
    line.setAttribute('y2', '0');
    groupContainer.appendChild(line);


    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('y', '-14');
    text.setAttribute('x', '6');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('text-anchor', 'left');
    text.innerHTML = `${this.sequence}`;
    groupContainer.appendChild(text);
  }

  private drawHalfSecondThick(groupContainer: SVGGElement): void {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('y1', '-10');
    line.setAttribute('y2', '0');
    groupContainer.appendChild(line);
  }

  private drawTenthOfSecondThick(groupContainer: SVGGElement): void {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('y1', '-5');
    line.setAttribute('y2', '0');
    groupContainer.appendChild(line);
  }
}
