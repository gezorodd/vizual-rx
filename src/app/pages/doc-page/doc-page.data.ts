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
import {auditPage} from "./operators/filtering/audit/audit.page";
import {auditTimePage} from "./operators/filtering/audit-time/audit-time.page";
import {debouncePage} from "./operators/filtering/debounce/debounce.page";
import {debounceTimePage} from "./operators/filtering/debounce-time/debounce-time.page";
import {distinctPage} from "./operators/filtering/distinct/distinct.page";
import {distinctUntilChangedPage} from "./operators/filtering/distinct-until-changed/distinct-until-changed.page";
import {
  distinctUntilKeyChangedPage
} from "./operators/filtering/distinct-until-key-changed/distinct-until-key-changed.page";
import {elementAtPage} from "./operators/filtering/element-at/element-at.page";
import {filterPage} from "./operators/filtering/filter/filter.page";
import {firstPage} from "./operators/filtering/first/first.page";
import {ignoreElementsPage} from "./operators/filtering/ignore-elements/ignore-elements.page";
import {lastPage} from "./operators/filtering/last/last.page";
import {samplePage} from "./operators/filtering/sample/sample.page";
import {sampleTimePage} from "./operators/filtering/sample-time/sample-time.page";
import {singlePage} from "./operators/filtering/single/single.page";
import {skipPage} from "./operators/filtering/skip/skip.page";
import {skipLastPage} from "./operators/filtering/skip-last/skip-last.page";
import {skipUntilPage} from "./operators/filtering/skip-until/skip-until.page";
import {skipWhilePage} from "./operators/filtering/skip-while/skip-while.page";
import {takePage} from "./operators/filtering/take/take.page";
import {takeLastPage} from "./operators/filtering/take-last/take-last.page";
import {takeUntilPage} from "./operators/filtering/take-until/take-until.page";
import {takeWhilePage} from "./operators/filtering/take-while/take-while.page";
import {throttlePage} from "./operators/filtering/throttle/throttle.page";
import {throttleTimePage} from "./operators/filtering/throttle-time/throttle-time.page";
import {combineLatestAllPage} from "./operators/join/combine-latest-all/combine-latest-all.page";
import {concatAllPage} from "./operators/join/concat-all/concat-all.page";
import {mergeAllPage} from "./operators/join/mege-all/merge-all.page";
import {switchAllPage} from "./operators/join/switch-all/switch-all.page";
import {startWithPage} from "./operators/join/start-with/start-with.page";
import {withLatestFromPage} from "./operators/join/with-latest-from/with-latest-from.page";
import {multicastPage} from "./operators/multicasting/multicast/multicast.page";
import {publishPage} from "./operators/multicasting/publish/publish.page";
import {publishBehaviorPage} from "./operators/multicasting/publish-behavior/publish-behavior.page";
import {publishLastPage} from "./operators/multicasting/publish-last/publish-last.page";
import {publishReplayPage} from "./operators/multicasting/publish-replay/publish-replay.page";
import {sharePage} from "./operators/multicasting/share/share.page";
import {shareReplayPage} from "./operators/multicasting/share-replay/share-replay.page";
import {connectPage} from "./operators/multicasting/connect/connect.page";
import {connectablePage} from "./operators/multicasting/connectable/connectable.page";
import {catchErrorPage} from "./operators/error-handling/catch-error/catch-error.page";
import {retryPage} from "./operators/error-handling/retry/retry.page";
import {retryWhenPage} from "./operators/error-handling/retry-when/retry-when.page";
import {tapPage} from "./operators/utility/tap/tap.page";
import {delayPage} from "./operators/utility/delay/delay.page";
import {delayWhenPage} from "./operators/utility/delay-when/delay-when.page";
import {dematerializePage} from "./operators/utility/dematerialize/dematerialize.page";
import {materializePage} from "./operators/utility/materialize/materialize.page";
import {timeIntervalPage} from "./operators/utility/time-interval/time-interval.page";
import {timestampPage} from "./operators/utility/timestamp/timestamp.page";
import {timeoutPage} from "./operators/utility/timeout/timeout.page";
import {timeoutWithPage} from "./operators/utility/timeout-with/timeout-with.page";
import {toArrayPage} from "./operators/utility/to-array/to-array.page";
import {everyPage} from "./operators/conditional/every/every.page";
import {findPage} from "./operators/conditional/find/find.page";
import {findIndexPage} from "./operators/conditional/find-index/find-index.page";
import {isEmptyPage} from "./operators/conditional/is-empty/is-empty.page";
import {countPage} from "./operators/aggregate/count/count.page";
import {minPage} from "./operators/aggregate/min/min.page";
import {maxPage} from "./operators/aggregate/max/max.page";
import {reducePage} from "./operators/aggregate/reduce/reduce.page";
import {subjectPage} from "./subjects/subject/subject.page";
import {behaviorSubjectPage} from "./subjects/behavior-subject/behavior-subject.page";
import {replaySubjectPage} from "./subjects/replay-subject/replay-subject.page";
import {asyncSubjectPage} from "./subjects/async-subject/async-subject.page";

export const docPages = [
  // Subjects
  subjectPage,
  behaviorSubjectPage,
  replaySubjectPage,
  asyncSubjectPage,
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
  // Filtering operators
  auditPage,
  auditTimePage,
  debouncePage,
  debounceTimePage,
  distinctPage,
  distinctUntilChangedPage,
  distinctUntilKeyChangedPage,
  elementAtPage,
  filterPage,
  firstPage,
  ignoreElementsPage,
  lastPage,
  samplePage,
  sampleTimePage,
  singlePage,
  skipPage,
  skipLastPage,
  skipUntilPage,
  skipWhilePage,
  takePage,
  takeLastPage,
  takeUntilPage,
  takeWhilePage,
  throttlePage,
  throttleTimePage,
  // Join Operators
  combineAllPage,
  combineLatestAllPage,
  concatAllPage,
  exhaustAllPage,
  mergeAllPage,
  switchAllPage,
  startWithPage,
  withLatestFromPage,
  // Multicasting
  connectPage,
  connectablePage,
  multicastPage,
  publishPage,
  publishBehaviorPage,
  publishLastPage,
  publishReplayPage,
  sharePage,
  shareReplayPage,
  // Error Handling
  catchErrorPage,
  retryPage,
  retryWhenPage,
  // Utility
  tapPage,
  delayPage,
  delayWhenPage,
  dematerializePage,
  materializePage,
  timeIntervalPage,
  timestampPage,
  timeoutPage,
  timeoutWithPage,
  toArrayPage,
  // Conditional
  defaultIfEmptyPage,
  everyPage,
  findPage,
  findIndexPage,
  isEmptyPage,
  // Aggregate
  countPage,
  maxPage,
  minPage,
  reducePage
];
