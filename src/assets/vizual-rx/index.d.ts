import {Observer} from "rxjs";

export type VizualRxValueShape = 'circle' | 'square' | 'triangle' | 'diamond' | 'pentagon';

export type VizualRxValueColor = 'red' | 'blue' | 'green' | 'orange' | 'yellow' | 'purple' | 'cyan' | 'pink';

export type VizualRxValueAttribute = VizualRxValueShape | VizualRxValueColor;

export declare class VizualRxValue {
  shape: VizualRxValueShape;
  color: VizualRxValueColor;
}

export declare function observe(name?: string): Observer<any>

export declare function createValue(...attributes: VizualRxValueAttribute[]): VizualRxValue;

export declare function colorAt(index: number): VizualRxValueColor;

export declare function shapeAt(index: number): VizualRxValueShape;
