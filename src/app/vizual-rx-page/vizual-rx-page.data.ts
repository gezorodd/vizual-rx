import {ajaxPage} from "./operators/creation/ajax/ajax.page";
import {bindCallbackPage} from "./operators/creation/bind-callback/bind-callback.page";
import {bindNodeCallbackPage} from "./operators/creation/bind-node-callback/bind-node-callback.page";
import {deferPage} from "./operators/creation/defer/defer.page";
import {emptyPage} from "./operators/creation/empty/empty.page";
import {fromPage} from "./operators/creation/from/from.page";
import {fromEventPage} from "./operators/creation/fromEvent/from-event.page";
import {fromEventPatternPage} from "./operators/creation/fromEventPattern/from-event-pattern.page";
import {generatePage} from "./operators/creation/generate/generate.page";
import {intervalPage} from "./operators/creation/interval/interval.page";
import {ofPage} from "./operators/creation/of/of.page";
import {rangePage} from "./operators/creation/range/range.page";
import {throwErrorPage} from "./operators/creation/throwError/throw-error.page";
import {timerPage} from "./operators/creation/timer/timer.page";
import {iifPage} from "./operators/creation/iif/iif.page";
import {combineAllPage} from "./operators/join/combine-all/combine-all.page";
import {combineLatestPage} from "./operators/join-creation/combine-latest/combine-latest.page";
import {defaultIfEmptyPage} from "./operators/conditional/default-if-empty/default-if-empty.page";
import {playgroundPage} from "./vizual-rx/playground/playground.page";
import {concatPage} from "./operators/join-creation/concat/concat.page";
import {forkJoinPage} from "./operators/join-creation/forkJoin/fork-join.page";
import {mergePage} from "./operators/join-creation/merge/merge.page";
import {partitionPage} from "./operators/join-creation/partition/partition.page";
import {racePage} from "./operators/join-creation/race/race.page";
import {zipPage} from "./operators/join-creation/zip/zip.page";

export const pages = [
  // Creation
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
  // Join Creation
  combineLatestPage,
  concatPage,
  forkJoinPage,
  mergePage,
  partitionPage,
  racePage,
  zipPage,

  combineAllPage,
  defaultIfEmptyPage,
  playgroundPage
];
