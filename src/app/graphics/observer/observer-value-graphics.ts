import {DynamicObjectGraphics} from "../dynamic-object-graphics";
import tippy from 'tippy.js'
import {VizualRxValue} from "../../core/vizual-rx-value";
import {VizualRxRemote, VizualRxRemoteNextNotification} from "../../remote/vizual-rx-remote.model";


export class ObserverValueGraphics extends DynamicObjectGraphics {
  private readonly value: any;

  constructor(remote: VizualRxRemote, notification: VizualRxRemoteNextNotification) {
    super(remote, notification.time);
    this.value = notification.value;
  }

  protected override init(groupContainer: SVGGElement): void {
    const container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    container.classList.add('observer-value');
    groupContainer.appendChild(container);

    if (this.value instanceof VizualRxValue) {
      this.drawVizualRxValue(container, this.value);
    } else if (this.isArrayOfVizualRxValue(this.value)) {
      this.drawVizualRxValueArray(container, this.value);
    } else {
      this.drawDefaultValue(container, this.value);
    }
  }

  private isArrayOfVizualRxValue(value: any): boolean {
    if (!Array.isArray(value)) {
      return false;
    }
    const array = value as any[];
    return array.every(item => item instanceof VizualRxValue);
  }

  private drawVizualRxValue(container: SVGGElement, value: VizualRxValue): SVGElement {
    let element: SVGElement;
    switch (value.shape) {
      case 'circle':
        element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        element.setAttribute('r', '18');
        break;
      case 'square':
        element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        element.setAttribute('width', '36');
        element.setAttribute('height', '36');
        element.setAttribute('x', '-18');
        element.setAttribute('y', '-18');
        break;
      case 'triangle':
        element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        element.setAttribute('d', 'M -18 18 L 0 -18 L 18 18 Z');
        break;
      case 'diamond':
        element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        element.setAttribute('d', 'M 0 -22 L -18 0 L 0 22 L 18 0 Z');
        break;
      case 'pentagon':
        element = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        element.setAttribute('points', '0,-20 20,-5 12,18 -12,18 -20,-5');
        break;
    }
    element.classList.add(`color-${value.color}`);
    container.appendChild(element);
    return element;
  }

  private drawVizualRxValueArray(container: SVGGElement, values: VizualRxValue[]): void {
    if (values.length) {
      const arrayLayout = this.computeArrayLayout(values.length);
      for (let i = 0; i < values.length; i++) {
        const translate = arrayLayout.translates[i];
        const valueElement = this.drawVizualRxValue(container, values[i]);
        valueElement.style.transform = `translate(${translate.x}px, ${translate.y}px) scale(${arrayLayout.scale})`;
      }
    }
    const arraySymbols = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    arraySymbols.classList.add("array-symbol");
    arraySymbols.setAttribute('d', 'M -30 -32 H -40 V 32 H -30 M 30 -32 H 40 V 32 H 30');
    container.appendChild(arraySymbols);
  }

  private computeArrayLayout(arraySize: number): ArrayLayout {
    const xAvailableSpace = 90;
    const yAvailableSpace = 75;
    const valueSize = 45;

    const colCount = Math.ceil(Math.sqrt(arraySize));
    const regularRowCount = Math.floor(arraySize / colCount);
    const totalRowCount = Math.ceil(arraySize / colCount);

    const xEvenSpaceRegularRow = xAvailableSpace / (colCount + 1);
    const yEvenSpace = yAvailableSpace / (totalRowCount + 1);

    const translates: Translate[] = [];
    for (let i = 0; i < regularRowCount; i++) {
      const y = ((i + 1) * yEvenSpace) - (yAvailableSpace / 2);
      for (let j = 0; j < colCount; j++) {
        const x = ((j + 1) * xEvenSpaceRegularRow) - (xAvailableSpace / 2);
        translates.push({
          x, y
        });
      }
    }

    const lastRowSize = arraySize % colCount;
    if (lastRowSize !== 0) {
      const y = ((regularRowCount + 1) * yEvenSpace) - (yAvailableSpace / 2);
      const xEvenSpaceLastRow = xAvailableSpace / (lastRowSize + 1);
      for (let i = 0; i < lastRowSize; i++) {
        const x = ((i + 1) * xEvenSpaceLastRow) - (xAvailableSpace / 2);
        translates.push({
          x, y
        });
      }
    }

    const xScale = Math.min(xAvailableSpace / ((colCount + 1) * valueSize), 1);
    const yScale = Math.min(yAvailableSpace / ((totalRowCount + 1) * valueSize), 1);
    const scale = Math.min(xScale, yScale);
    return new ArrayLayout(scale, translates);
  }

  private drawDefaultValue(container: SVGGElement, value: any): void {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('r', '20');
    container.appendChild(circle);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('text-anchor', 'middle');
    container.appendChild(text);

    const content = JSON.stringify(value);
    if (value === undefined) {
      text.innerHTML = 'undef';
    } else if (content.length > 5) {
      text.innerHTML = "...";
      tippy(container, {
        content,
        placement: 'bottom',
        animation: 'scale',
        inertia: true
      });
    } else {
      text.innerHTML = content;
    }
  }
}

class ArrayLayout {
  readonly scale: number;
  readonly translates: Translate[];

  constructor(scale: number, translates: Translate[]) {
    this.scale = scale;
    this.translates = translates;
  }
}

interface Translate {
  readonly x: number;
  readonly y: number;
}
