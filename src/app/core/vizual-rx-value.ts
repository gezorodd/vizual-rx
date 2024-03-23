export class VizualRxValue {
  shape: VizualRxValueShape;
  color: VizualRxValueColor;

  constructor(...attributes: VizualRxValueAttribute[]) {
    let shape: VizualRxValueShape | undefined;
    let color: VizualRxValueColor | undefined

    attributes.forEach(a => {
      if ((SHAPES as string[]).includes(a)) {
        shape = a as VizualRxValueShape;
      } else if ((COLORS as string[]).includes(a)) {
        color = a as VizualRxValueColor;
      }
    });

    if (!shape) {
      shape = VizualRxValue.pickRandomly(...SHAPES);
    }
    if (!color) {
      color = VizualRxValue.pickRandomly(...COLORS);
    }
    this.shape = shape;
    this.color = color;
  }

  equals(other: VizualRxValue): boolean {
    return other.shape === this.shape && other.color === this.color;
  }

  private static pickRandomly<T>(...array: T[]): T {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
  }
}

export type VizualRxValueShape = 'circle' | 'square' | 'triangle' | 'diamond' | 'pentagon';

export type VizualRxValueColor = 'red' | 'blue' | 'green' | 'orange' | 'yellow' | 'purple' | 'cyan' | 'pink';

export type VizualRxValueAttribute = VizualRxValueShape | VizualRxValueColor;

export const SHAPES: VizualRxValueShape[] = ['circle', 'square', 'triangle', 'diamond', 'pentagon'];
export const COLORS: VizualRxValueColor[] = ['red', 'blue', 'green', 'orange', 'yellow', 'purple', 'cyan', 'pink'];
