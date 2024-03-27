import {combineAllPage} from "./combine-all/combine-all.page";
import {combineLatestPage} from "./combine-latest/combine-latest.page";
import {defaultIfEmptyPage} from "./default-if-empty/default-if-empty.page";
import {playgroundPage} from "./playground/playground.page";
import {ajaxPage} from "./ajax/ajax.page";
import {bindCallbackPage} from "./bind-callback/bind-callback.page";
import {bindNodeCallbackPage} from "./bind-node-callback/bind-node-callback.page";
import {deferPage} from "./defer/defer.page";
import {emptyPage} from "./empty/empty.page";
import {fromPage} from "./from/from.page";
import {fromEventPage} from "./fromEvent/from-event.page";
import {fromEventPatternPage} from "./fromEventPattern/from-event-pattern.page";
import {generatePage} from "./generate/generate.page";
import {intervalPage} from "./interval/interval.page";
import {ofPage} from "./of/of.page";
import {rangePage} from "./range/range.page";
import {throwErrorPage} from "./throwError/throw-error.page";
import {timerPage} from "./timer/timer.page";
import {iifPage} from "./iif/iif.page";

export const pages = [
  ajaxPage,
  bindCallbackPage,
  bindNodeCallbackPage,
  deferPage,
  emptyPage,
  fromPage,
  fromEventPage,
  fromEventPatternPage,
  generatePage,
  intervalPage,
  ofPage,
  rangePage,
  throwErrorPage,
  timerPage,
  iifPage,

  combineAllPage,
  combineLatestPage,
  defaultIfEmptyPage,
  playgroundPage
];
