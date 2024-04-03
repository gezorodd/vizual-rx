import {Type} from "@angular/core";

export type VizualRxCodeProvider<T> = [Type<T>, (this: T) => string];

export type VizualRxCode = string | VizualRxCodeProvider<any>;

export type VizualRxCodeMap = { [name: string]: VizualRxCode };
