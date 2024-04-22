import {SchedulerAction, SchedulerLike, Subscription} from "rxjs";
import {VizualRxScaledTimeAction} from "./vizual-rx-scaled-time-action";
import {VizualRxScaledTime} from "./vizual-rx-scaled-time";

/**
 * This is a copy of the rxjs AsyncScheduler, adapted to scale time with VizualRxTime timeFactor.
 */
export class VizualRxScaledTimeScheduler implements SchedulerLike {

  /**
   * A getter method that returns a number representing the current time
   * (at the time this function was called) according to the scheduler's own
   * internal clock.
   * @return {number} A number that represents the current time. May or may not
   * have a relation to wall-clock time. May or may not refer to a time unit
   * (e.g. milliseconds).
   */
  public now: () => number;

  constructor(public scaledTime: VizualRxScaledTime) {
    this.now = scaledTime.scaledNow.bind(scaledTime);
  }

  /**
   * Schedules a function, `work`, for execution. May happen at some point in
   * the future, according to the `delay` parameter, if specified. May be passed
   * some context object, `state`, which will be passed to the `work` function.
   *
   * The given arguments will be processed an stored as an Action object in a
   * queue of actions.
   *
   * @param {function(state: ?T): ?Subscription} work A function representing a
   * task, or some unit of work to be executed by the Scheduler.
   * @param {number} [delay] Time to wait before executing the work, where the
   * time unit is implicit and defined by the Scheduler itself.
   * @param {T} [state] Some contextual data that the `work` function uses when
   * called by the Scheduler.
   * @return {Subscription} A subscription in order to be able to unsubscribe
   * the scheduled work.
   */
  public schedule<T>(work: (this: SchedulerAction<T>, state?: T) => void, delay: number = 0, state?: T): Subscription {
    return new VizualRxScaledTimeAction<T>(this, work).schedule(state, delay);
  }


  public actions: Array<VizualRxScaledTimeAction<any>> = [];
  /**
   * A flag to indicate whether the Scheduler is currently executing a batch of
   * queued actions.
   * @type {boolean}
   * @internal
   */
  public _active: boolean = false;

  public flush(action: VizualRxScaledTimeAction<any>): void {
    const {actions} = this;

    if (this._active) {
      actions.push(action);
      return;
    }

    let error: any;
    this._active = true;

    do {
      if ((error = action.execute(action.state, action.delay))) {
        break;
      }
    } while ((action = actions.shift()!)); // exhaust the scheduler queue

    this._active = false;

    if (error) {
      while ((action = actions.shift()!)) {
        action.unsubscribe();
      }
      throw error;
    }
  }
}
