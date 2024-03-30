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
import {bufferPage} from "./operators/transformation/buffer/buffer.page";
import {bufferCountPage} from "./operators/transformation/buffer-count/buffer-count.page";
import {bufferTimePage} from "./operators/transformation/buffer-time/buffer-time.page";
import {bufferTogglePage} from "./operators/transformation/buffer-toggle/buffer-toggle.page";
import {bufferWhenPage} from "./operators/transformation/buffer-when/buffer-when.page";
import {concatMapPage} from "./operators/transformation/concat-map/concat-map.page";
import {concatMapToPage} from "./operators/transformation/concat-map-to/concat-map-to.page";
import {exhaustPage} from "./operators/transformation/exhaust/exhaust.page";
import {exhaustAllPage} from "./operators/join/exhaust-all/exhaust-all.page";
import {exhaustMapPage} from "./operators/transformation/exhaust-map/exhaust-map.page";
import {expandPage} from "./operators/transformation/expand/expand.page";
import {groupByPage} from "./operators/transformation/group-by/group-by.page";
import {mapPage} from "./operators/transformation/map/map.page";
import {mapToPage} from "./operators/transformation/map-to/map-to.page";
import {mergeMapPage} from "./operators/transformation/merge-map/merge-map.page";
import {mergeMapToPage} from "./operators/transformation/merge-map-to/merge-map-to.page";
import {mergeScanPage} from "./operators/transformation/merge-scan/merge-scan.page";
import {pairwisePage} from "./operators/transformation/pairwise/pairwise.page";
import {partitionPage as partitionOperatorPage} from "./operators/transformation/partition/partition.page";
import {pluckPage} from "./operators/transformation/pluck/pluck.page";
import {scanPage} from "./operators/transformation/scan/scan.page";
import {switchScanPage} from "./operators/transformation/switch-scan/switch-scan.page";
import {switchMapPage} from "./operators/transformation/switch-map/switch-map.page";
import {switchMapToPage} from "./operators/transformation/switch-map-to/switch-map-to.page";
import {windowPage} from "./operators/transformation/window/window.page";
import {windowCountPage} from "./operators/transformation/window-count/window-count.page";
import {windowTimePage} from "./operators/transformation/window-time/window-time.page";
import {windowTogglePage} from "./operators/transformation/window-toggle/window-toggle.page";
import {windowWhenPage} from "./operators/transformation/window-when/window-when.page";

export const pages = [
  // Creation Operators
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
  // Join Creation Operators
  combineLatestPage,
  concatPage,
  forkJoinPage,
  mergePage,
  partitionPage,
  racePage,
  zipPage,
  // Transformation Operators
  bufferPage,
  bufferCountPage,
  bufferTimePage,
  bufferTogglePage,
  bufferWhenPage,
  concatMapPage,
  concatMapToPage,
  exhaustPage,
  exhaustMapPage,
  expandPage,
  groupByPage,
  mapPage,
  mapToPage,
  mergeMapPage,
  mergeMapToPage,
  mergeScanPage,
  pairwisePage,
  partitionOperatorPage,
  pluckPage,
  scanPage,
  switchScanPage,
  switchMapPage,
  switchMapToPage,
  windowPage,
  windowCountPage,
  windowTimePage,
  windowTogglePage,
  windowWhenPage,

  // Join Operators
  exhaustAllPage,

  combineAllPage,
  defaultIfEmptyPage,
  playgroundPage
];
