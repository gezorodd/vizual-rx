import {Observer, Subject} from "rxjs";
import {VizualRxCoreObserver} from "./vizual-rx-core-observer";
import {
  COLORS,
  SHAPES,
  VizualRxValue,
  VizualRxValueAttribute,
  VizualRxValueColor,
  VizualRxValueShape
} from "./vizual-rx-value";

export class VizualRxApi {
  private readonly observerAdded$: Subject<VizualRxCoreObserver>;

  constructor(observerAdded$: Subject<VizualRxCoreObserver>) {
    this.observerAdded$ = observerAdded$;
  }

  getExports(): any {
    return {
      observe: this.observe.bind(this),
      createValue: this.createValue.bind(this),
      colorAt: this.colorAt.bind(this),
      shapeAt: this.shapeAt.bind(this)
    };
  }

  private observe(name?: string): Observer<any> {
    const observer = new VizualRxCoreObserver(name ?? '');
    this.observerAdded$.next(observer);
    return observer;
  }

  private createValue(...attributes: VizualRxValueAttribute[]): VizualRxValue {
    return new VizualRxValue(...attributes);
  }

  private colorAt(index: number): VizualRxValueColor {
    return COLORS[index % COLORS.length];
  }

  private shapeAt(index: number): VizualRxValueShape {
    return SHAPES[index % SHAPES.length];
  }
}
