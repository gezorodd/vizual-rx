import {Observer, Subject} from "rxjs";
import {VizualRxObserver} from "./vizual-rx-observer";
import {
  COLORS,
  SHAPES,
  VizualRxValue,
  VizualRxValueAttribute,
  VizualRxValueColor,
  VizualRxValueShape
} from "./vizual-rx-value";

export class VizualRxApi {
  private readonly observerAdded$: Subject<VizualRxObserver>;

  constructor(observerAdded$: Subject<VizualRxObserver>) {
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
    const observer = new VizualRxObserver(name ?? '');
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
