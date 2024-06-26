import {
  animationFrames,
  auditTime,
  bindCallback,
  bufferTime,
  debounceTime,
  defer,
  delay,
  empty,
  from,
  fromEvent,
  fromEventPattern,
  generate,
  interval,
  Observable,
  of,
  sampleTime,
  Scheduler,
  SchedulerLike,
  shareReplay,
  Subject,
  Subscription,
  throttleTime,
  timeInterval,
  timeout,
  timeoutWith,
  timer
} from "rxjs";
import {ajax} from "rxjs/internal/ajax/ajax";

export class VizualRxProxies {
  readonly rxjsProxies: { [key: string]: any };
  readonly rxjsAjaxProxies: { [key: string]: any };

  private readonly _subscriptionCreated$ = new Subject<Subscription>();
  private readonly scheduler: SchedulerLike;

  constructor(scheduler: SchedulerLike) {
    this.scheduler = scheduler;
    const o = this.watchObservableFactory.bind(this);
    const s = this.injectScheduler.bind(this);
    this.rxjsProxies = {
      of: o(of),
      delay: s(delay),
      interval: o(s(interval)),
      debounceTime: s(debounceTime),
      bufferTime: s(bufferTime),
      auditTime: s(auditTime),
      timer: o(s(timer)),
      sampleTime: s(sampleTime),
      timeInterval: s(timeInterval),
      throttleTime: s(throttleTime, 1),
      timeoutWith: s(timeoutWith),
      shareReplay: s(shareReplay),
      timeout: s(timeout),
      bindCallback: this.watchBindCallback(bindCallback),
      from: o(from),
      fromEvent: o(fromEvent),
      fromEventPattern: o(fromEventPattern),
      generate: o(generate),
      defer: o(defer),
      empty: o(s(empty)),
      animationFrames: this.injectTimestampProvider(o(animationFrames))
    };
    this.rxjsAjaxProxies = {
      ajax: o(ajax)
    }
  }

  get subscriptionCreated$(): Observable<Subscription> {
    return this._subscriptionCreated$.asObservable();
  }

  private injectScheduler<T extends (...p: Parameters<T>) => ReturnType<T>>(func: T, positionRelativeToEnd = 0): T {
    const self = this;
    return new Proxy(func, {
      apply(target: T, thisArg: any, argArray: any[]): any {
        if (typeof argArray[0] === 'object') {
          argArray[0] = {...arguments[0], scheduler: self.scheduler};
          return target.apply(thisArg, argArray as Parameters<T>);
        }
        const position = arguments.length - positionRelativeToEnd - 1;
        if (argArray.length > positionRelativeToEnd && argArray[position] instanceof Scheduler) {
          argArray[position] = self.scheduler;
        } else {
          argArray.push(self.scheduler);
        }
        return target.apply(thisArg, argArray as Parameters<T>);
      }
    });
  }

  private watchObservableFactory<T extends (...p: Parameters<T>) => ReturnType<T> & Observable<unknown>>(factory: T): T {
    const self = this;
    return new Proxy(factory, {
      apply(target: T, thisArg: ThisParameterType<T>, argArray: Parameters<T>): any {
        const observable = (target as any).apply(thisArg, argArray);
        return self.watchObservable(observable);
      }
    });
  }

  private watchObservable<V, T extends Observable<V>>(observable: T): T {
    const self = this;
    return new Proxy(observable, {
      get(target: T, p: string | symbol): any {
        let value = (target as any)[p];
        if (p === 'subscribe') {
          value = self.watchSubscribe(value);
        } else if (p === 'pipe') {
          value = self.watchPipe(value);
        }
        return value;
      }
    });
  }

  private watchSubscribe<T extends typeof Observable.prototype.subscribe>(subscribe: T): T {
    const self = this;
    return new Proxy(subscribe, {
      apply(target: T, thisArg: ThisParameterType<T>, argArray: Parameters<T>): any {
        const subscription = target.apply(thisArg, argArray);
        self._subscriptionCreated$.next(subscription);
        return subscription;
      }
    });
  }

  private watchPipe<T extends typeof Observable.prototype.pipe>(subscribe: T): T {
    const self = this;
    return new Proxy(subscribe, {
      apply(target: T, thisArg: ThisParameterType<T>, argArray: Parameters<T>): any {
        const observable = target.apply(thisArg, argArray);
        return self.watchObservable(observable);
      }
    });
  }

  private watchBindCallback(func: typeof bindCallback): typeof bindCallback {
    const self = this;
    return new Proxy(func, {
      apply(target: typeof bindCallback, thisArg: ThisParameterType<typeof bindCallback>, args: Parameters<typeof bindCallback>) {
        return new Proxy(target.apply(thisArg, args), {
          apply(target: any, thisArg: any, argArray: any[]): any {
            return self.watchObservable(target.apply(thisArg, argArray));
          }
        });
      }
    });
  }

  private injectTimestampProvider(func: typeof animationFrames): typeof animationFrames {
    const self = this;
    return new Proxy(func, {
      apply(target: typeof animationFrames, thisArg: ThisParameterType<typeof animationFrames>) {
        return target.apply(thisArg, [self.scheduler]);
      }
    });
  }
}
