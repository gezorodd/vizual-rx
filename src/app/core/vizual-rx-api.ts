import {interval, map, MonoTypeOperatorFunction, Observable, Observer, Subject, zip} from "rxjs";
import {VizualRxObserver} from "./vizual-rx-observer";
import {
  COLORS,
  SHAPES,
  VizualRxValue,
  VizualRxValueAttribute,
  VizualRxValueColor,
  VizualRxValueShape
} from "./vizual-rx-value";
import {vizualRxScheduler} from "./vizual-rx-scheduler";
import {colorAt} from "../../assets/vizual-rx";

export class VizualRxApi {
  private readonly observerAdded$: Subject<VizualRxObserver>;

  constructor(observerAdded$: Subject<VizualRxObserver>) {
    this.observerAdded$ = observerAdded$;
  }

  getExports(): any {
    return {
      observe: this.observe.bind(this),
      createValue: this.createValue.bind(this),
      delayBetween: this.delayBetween.bind(this),
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

  private delayBetween<T>(delay: number): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>) => {
      return zip(source, interval(delay, vizualRxScheduler))
        .pipe(
          map(([value]) => value)
        )
    };
  }

  private colorAt(index: number): VizualRxValueColor {
    return COLORS[index % COLORS.length];
  }

  private shapeAt(index: number): VizualRxValueShape {
    return SHAPES[index % SHAPES.length];
  }
}
