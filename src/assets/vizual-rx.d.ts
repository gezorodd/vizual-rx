import {Observer} from "rxjs";
import {VizualRxValueColor, VizualRxValueShape} from "../app/core/vizual-rx-value";

export declare function observe(name?: string): Observer<any>

export declare function createValue(...attributes: VizualRxValueAttribute[]): VizualRxValue;

export declare function colorAt(index: number): VizualRxValueColor;

export declare function shapeAt(index: number): VizualRxValueShape;
