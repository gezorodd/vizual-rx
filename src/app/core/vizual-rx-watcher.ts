import {Observable, Subject, Subscription} from "rxjs";

export class VizualRxWatcher {
  private readonly subscribe$ = new Subject<Subscription>();

  constructor() {
    this.createProxyOverSubscribe();
  }

  private createProxyOverSubscribe() {
    const self = this;

    const subscribeProxy = new Proxy(Observable.prototype.subscribe, {
      apply(target: any, thisArg: any, argArray: any[]): any {
        if (self.isInInterpreterStack()) {
          const subscription = target.apply(thisArg, argArray);
          self.subscribe$.next(subscription);
          return subscription;
        } else {
          return target.apply(thisArg, argArray);
        }
      }
    });

    Observable.prototype = new Proxy(Observable.prototype, {
      get: function (target: any, name: string): any {
        if (name === 'subscribe') {
          return subscribeProxy;
        } else {
          return target[name];
        }
      }
    });
  }

  private isInInterpreterStack(): boolean {
    const stack = new Error().stack;
    if (!stack) {
      return false;
    }
    const lines = stack.split('\n');
    return lines.length >= 4 && lines[3].indexOf("createExecutionFunction") !== -1;
  }
}
