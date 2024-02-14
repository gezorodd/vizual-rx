import {
  auditTime,
  bufferTime,
  debounceTime,
  delay,
  interval,
  observeOn,
  sampleTime,
  Scheduler,
  shareReplay,
  subscribeOn,
  throttleTime,
  timeInterval,
  timeout,
  timeoutWith,
  timer
} from "rxjs";
import {vizualRxScheduler} from "./vizual-rx-scheduler";

export const vizualRxProxies = {
  delay: injectVizualRxSchedulerAtPositionOrLast(delay),
  interval: injectVizualRxSchedulerAtPositionOrLast(interval),
  debounceTime: injectVizualRxSchedulerAtPositionOrLast(debounceTime),
  bufferTime: injectVizualRxSchedulerAtPositionOrLast(bufferTime),
  auditTime: injectVizualRxSchedulerAtPositionOrLast(auditTime),
  timer: injectVizualRxSchedulerAtPositionOrLast(timer),
  sampleTime: injectVizualRxSchedulerAtPositionOrLast(sampleTime),
  timeInterval: injectVizualRxSchedulerAtPositionOrLast(timeInterval),
  throttleTime: injectVizualRxSchedulerAtPositionOrLast(throttleTime, 1),
  observeOn: injectVizualRxSchedulerAtPositionOrLast(observeOn, 1),
  subscribeOn: injectVizualRxSchedulerAtPositionOrLast(subscribeOn, 1),
  timeoutWith: injectVizualRxSchedulerAtPositionOrLast(timeoutWith),
  shareReplay: injectVizualRxSchedulerAtPositionOrLast(shareReplay),
  timeout: vizualRxTimeout
};

function vizualRxTimeout(): ReturnType<typeof timeout> {
  if (typeof arguments[0] === 'object') {
    return timeout({...arguments[0], scheduler: vizualRxScheduler});
  } else {
    return timeout(arguments[0], vizualRxScheduler);
  }
}

function injectVizualRxSchedulerAtPositionOrLast<T extends (...p: Parameters<T>) => ReturnType<T>>(originalFunction: T, positionRelativeToEnd = 0): T {
  return <T><unknown>function (this: ThisParameterType<T>) {
    const args = [...arguments];
    const position = arguments.length - positionRelativeToEnd - 1;
    if (args.length > positionRelativeToEnd && args[position] instanceof Scheduler) {
      args[position] = vizualRxScheduler;
    } else {
      args.push(vizualRxScheduler);
    }
    return originalFunction.apply(this, args as Parameters<T>);
  };
}
