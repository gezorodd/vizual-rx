import {SectionDefinition} from "./sidenav.model";
import {ajaxPage} from "../pages/doc-page/operators/creation/ajax/ajax.page";
import {bindCallbackPage} from "../pages/doc-page/operators/creation/bind-callback/bind-callback.page";
import {bindNodeCallbackPage} from "../pages/doc-page/operators/creation/bind-node-callback/bind-node-callback.page";
import {deferPage} from "../pages/doc-page/operators/creation/defer/defer.page";
import {emptyPage} from "../pages/doc-page/operators/creation/empty/empty.page";
import {fromPage} from "../pages/doc-page/operators/creation/from/from.page";
import {fromEventPage} from "../pages/doc-page/operators/creation/fromEvent/from-event.page";
import {fromEventPatternPage} from "../pages/doc-page/operators/creation/fromEventPattern/from-event-pattern.page";
import {generatePage} from "../pages/doc-page/operators/creation/generate/generate.page";
import {intervalPage} from "../pages/doc-page/operators/creation/interval/interval.page";
import {ofPage} from "../pages/doc-page/operators/creation/of/of.page";
import {rangePage} from "../pages/doc-page/operators/creation/range/range.page";
import {throwErrorPage} from "../pages/doc-page/operators/creation/throwError/throw-error.page";
import {timerPage} from "../pages/doc-page/operators/creation/timer/timer.page";
import {iifPage} from "../pages/doc-page/operators/creation/iif/iif.page";
import {playgroundPageData} from "../pages/playground-page/playground.page.data";
import {combineAllPage} from "../pages/doc-page/operators/join/combine-all/combine-all.page";
import {combineLatestPage} from "../pages/doc-page/operators/join-creation/combine-latest/combine-latest.page";
import {defaultIfEmptyPage} from "../pages/doc-page/operators/conditional/default-if-empty/default-if-empty.page";
import {concatPage} from "../pages/doc-page/operators/join-creation/concat/concat.page";
import {forkJoinPage} from "../pages/doc-page/operators/join-creation/fork-join/fork-join.page";
import {mergePage} from "../pages/doc-page/operators/join-creation/merge/merge.page";
import {partitionPage} from "../pages/doc-page/operators/join-creation/partition/partition.page";
import {racePage} from "../pages/doc-page/operators/join-creation/race/race.page";
import {zipPage} from "../pages/doc-page/operators/join-creation/zip/zip.page";
import {bufferPage} from "../pages/doc-page/operators/transformation/buffer/buffer.page";
import {bufferCountPage} from "../pages/doc-page/operators/transformation/buffer-count/buffer-count.page";
import {bufferTimePage} from "../pages/doc-page/operators/transformation/buffer-time/buffer-time.page";
import {bufferTogglePage} from "../pages/doc-page/operators/transformation/buffer-toggle/buffer-toggle.page";
import {bufferWhenPage} from "../pages/doc-page/operators/transformation/buffer-when/buffer-when.page";
import {concatMapPage} from "../pages/doc-page/operators/transformation/concat-map/concat-map.page";
import {concatMapToPage} from "../pages/doc-page/operators/transformation/concat-map-to/concat-map-to.page";
import {exhaustPage} from "../pages/doc-page/operators/transformation/exhaust/exhaust.page";
import {exhaustAllPage} from "../pages/doc-page/operators/join/exhaust-all/exhaust-all.page";
import {exhaustMapPage} from "../pages/doc-page/operators/transformation/exhaust-map/exhaust-map.page";
import {expandPage} from "../pages/doc-page/operators/transformation/expand/expand.page";
import {groupByPage} from "../pages/doc-page/operators/transformation/group-by/group-by.page";
import {mapPage} from "../pages/doc-page/operators/transformation/map/map.page";
import {mapToPage} from "../pages/doc-page/operators/transformation/map-to/map-to.page";
import {mergeMapPage} from "../pages/doc-page/operators/transformation/merge-map/merge-map.page";
import {mergeMapToPage} from "../pages/doc-page/operators/transformation/merge-map-to/merge-map-to.page";
import {mergeScanPage} from "../pages/doc-page/operators/transformation/merge-scan/merge-scan.page";
import {pairwisePage} from "../pages/doc-page/operators/transformation/pairwise/pairwise.page";
import {
  partitionPage as partitionOperatorPage
} from "../pages/doc-page/operators/transformation/partition/partition.page";
import {pluckPage} from "../pages/doc-page/operators/transformation/pluck/pluck.page";
import {scanPage} from "../pages/doc-page/operators/transformation/scan/scan.page";
import {switchScanPage} from "../pages/doc-page/operators/transformation/switch-scan/switch-scan.page";
import {switchMapPage} from "../pages/doc-page/operators/transformation/switch-map/switch-map.page";
import {switchMapToPage} from "../pages/doc-page/operators/transformation/switch-map-to/switch-map-to.page";
import {windowPage} from "../pages/doc-page/operators/transformation/window/window.page";
import {windowCountPage} from "../pages/doc-page/operators/transformation/window-count/window-count.page";
import {windowTimePage} from "../pages/doc-page/operators/transformation/window-time/window-time.page";
import {windowTogglePage} from "../pages/doc-page/operators/transformation/window-toggle/window-toggle.page";
import {windowWhenPage} from "../pages/doc-page/operators/transformation/window-when/window-when.page";
import {auditPage} from "../pages/doc-page/operators/filtering/audit/audit.page";
import {auditTimePage} from "../pages/doc-page/operators/filtering/audit-time/audit-time.page";
import {debouncePage} from "../pages/doc-page/operators/filtering/debounce/debounce.page";
import {debounceTimePage} from "../pages/doc-page/operators/filtering/debounce-time/debounce-time.page";
import {distinctPage} from "../pages/doc-page/operators/filtering/distinct/distinct.page";
import {
  distinctUntilChangedPage
} from "../pages/doc-page/operators/filtering/distinct-until-changed/distinct-until-changed.page";
import {
  distinctUntilKeyChangedPage
} from "../pages/doc-page/operators/filtering/distinct-until-key-changed/distinct-until-key-changed.page";
import {elementAtPage} from "../pages/doc-page/operators/filtering/element-at/element-at.page";
import {filterPage} from "../pages/doc-page/operators/filtering/filter/filter.page";
import {firstPage} from "../pages/doc-page/operators/filtering/first/first.page";
import {ignoreElementsPage} from "../pages/doc-page/operators/filtering/ignore-elements/ignore-elements.page";
import {lastPage} from "../pages/doc-page/operators/filtering/last/last.page";
import {samplePage} from "../pages/doc-page/operators/filtering/sample/sample.page";
import {sampleTimePage} from "../pages/doc-page/operators/filtering/sample-time/sample-time.page";
import {singlePage} from "../pages/doc-page/operators/filtering/single/single.page";
import {skipPage} from "../pages/doc-page/operators/filtering/skip/skip.page";
import {skipLastPage} from "../pages/doc-page/operators/filtering/skip-last/skip-last.page";
import {skipUntilPage} from "../pages/doc-page/operators/filtering/skip-until/skip-until.page";
import {skipWhilePage} from "../pages/doc-page/operators/filtering/skip-while/skip-while.page";
import {takePage} from "../pages/doc-page/operators/filtering/take/take.page";
import {takeLastPage} from "../pages/doc-page/operators/filtering/take-last/take-last.page";
import {takeUntilPage} from "../pages/doc-page/operators/filtering/take-until/take-until.page";
import {takeWhilePage} from "../pages/doc-page/operators/filtering/take-while/take-while.page";
import {throttlePage} from "../pages/doc-page/operators/filtering/throttle/throttle.page";
import {throttleTimePage} from "../pages/doc-page/operators/filtering/throttle-time/throttle-time.page";
import {combineLatestAllPage} from "../pages/doc-page/operators/join/combine-latest-all/combine-latest-all.page";
import {concatAllPage} from "../pages/doc-page/operators/join/concat-all/concat-all.page";
import {mergeAllPage} from "../pages/doc-page/operators/join/mege-all/merge-all.page";
import {switchAllPage} from "../pages/doc-page/operators/join/switch-all/switch-all.page";
import {startWithPage} from "../pages/doc-page/operators/join/start-with/start-with.page";
import {withLatestFromPage} from "../pages/doc-page/operators/join/with-latest-from/with-latest-from.page";
import {overviewPage} from "../pages/overview-page/overview-page.data";
import {multicastPage} from "../pages/doc-page/operators/multicasting/multicast/multicast.page";
import {publishPage} from "../pages/doc-page/operators/multicasting/publish/publish.page";
import {publishBehaviorPage} from "../pages/doc-page/operators/multicasting/publish-behavior/publish-behavior.page";
import {publishLastPage} from "../pages/doc-page/operators/multicasting/publish-last/publish-last.page";
import {publishReplayPage} from "../pages/doc-page/operators/multicasting/publish-replay/publish-replay.page";
import {sharePage} from "../pages/doc-page/operators/multicasting/share/share.page";
import {shareReplayPage} from "../pages/doc-page/operators/multicasting/share-replay/share-replay.page";
import {connectPage} from "../pages/doc-page/operators/multicasting/connect/connect.page";
import {connectablePage} from "../pages/doc-page/operators/multicasting/connectable/connectable.page";
import {catchErrorPage} from "../pages/doc-page/operators/error-handling/catch-error/catch-error.page";
import {retryPage} from "../pages/doc-page/operators/error-handling/retry/retry.page";
import {retryWhenPage} from "../pages/doc-page/operators/error-handling/retry-when/retry-when.page";
import {tapPage} from "../pages/doc-page/operators/utility/tap/tap.page";
import {delayPage} from "../pages/doc-page/operators/utility/delay/delay.page";
import {delayWhenPage} from "../pages/doc-page/operators/utility/delay-when/delay-when.page";
import {dematerializePage} from "../pages/doc-page/operators/utility/dematerialize/dematerialize.page";
import {materializePage} from "../pages/doc-page/operators/utility/materialize/materialize.page";
import {timeIntervalPage} from "../pages/doc-page/operators/utility/time-interval/time-interval.page";
import {timestampPage} from "../pages/doc-page/operators/utility/timestamp/timestamp.page";
import {timeoutPage} from "../pages/doc-page/operators/utility/timeout/timeout.page";
import {timeoutWithPage} from "../pages/doc-page/operators/utility/timeout-with/timeout-with.page";
import {toArrayPage} from "../pages/doc-page/operators/utility/to-array/to-array.page";
import {everyPage} from "../pages/doc-page/operators/conditional/every/every.page";
import {findPage} from "../pages/doc-page/operators/conditional/find/find.page";
import {findIndexPage} from "../pages/doc-page/operators/conditional/find-index/find-index.page";
import {isEmptyPage} from "../pages/doc-page/operators/conditional/is-empty/is-empty.page";
import {countPage} from "../pages/doc-page/operators/aggregate/count/count.page";
import {minPage} from "../pages/doc-page/operators/aggregate/min/min.page";
import {maxPage} from "../pages/doc-page/operators/aggregate/max/max.page";
import {reducePage} from "../pages/doc-page/operators/aggregate/reduce/reduce.page";
import {subjectPage} from "../pages/doc-page/subjects/subject/subject.page";
import {behaviorSubjectPage} from "../pages/doc-page/subjects/behavior-subject/behavior-subject.page";
import {replaySubjectPage} from "../pages/doc-page/subjects/replay-subject/replay-subject.page";
import {asyncSubjectPage} from "../pages/doc-page/subjects/async-subject/async-subject.page";
import {animationFramesPage} from "../pages/doc-page/functions/animation-frames/animation-frames.page";
import {concatWithPage} from "../pages/doc-page/operators/join/concat-with/concat-with.page";
import {endWithPage} from "../pages/doc-page/operators/join/end-with/end-with.page";
import {finalizePage} from "../pages/doc-page/operators/utility/finalize/finalize.page";
import {firstValueFromPage} from "../pages/doc-page/functions/first-value-from/first-value-from.page";
import {lastValueFromPage} from "../pages/doc-page/functions/last-value-from/last-value-from.page";
import {mergeWithPage} from "../pages/doc-page/operators/join/merge-with/merge-with.page";
import {neverPage} from "../pages/doc-page/operators/creation/never/never.page";
import {
  onErrorResumeNextPage
} from "../pages/doc-page/operators/join-creation/on-error-resume-next/on-error-resume-next.page";
import {
  onErrorResumeNextWithPage
} from "../pages/doc-page/operators/join/on-error-resume-next-with/on-error-resume-next-with.page";
import {pipePage} from "../pages/doc-page/functions/pipe/pipe.page";
import {raceWithPage} from "../pages/doc-page/operators/join/race-with/race-with.page";
import {repeatPage} from "../pages/doc-page/operators/utility/repeat/repeat.page";
import {repeatWhenPage} from "../pages/doc-page/operators/utility/repeat-when/repeat-when.page";
import {sequenceEqualPage} from "../pages/doc-page/operators/conditional/sequence-equal/sequence-equal.page";
import {throwIfEmptyPage} from "../pages/doc-page/operators/utility/throw-if-empty/throw-if-empty.page";
import {usingPage} from "../pages/doc-page/functions/using/using.page";
import {zipWithPage} from "../pages/doc-page/operators/join/zip-with/zip-with.page";
import {combineLatestWithPage} from "../pages/doc-page/operators/join/combine-latest-with/combine-latest-with.page";

export const sectionDefinitions: SectionDefinition[] = [
  {
    label: 'VizualRx',
    children: [],
    pages: [
      overviewPage,
      playgroundPageData
    ]
  },
  {
    label: 'RxJS',
    version: 'v7.8.0',
    children: [
      {
        label: 'Subjects',
        collapsed: true,
        pages: [
          subjectPage,
          behaviorSubjectPage,
          replaySubjectPage,
          asyncSubjectPage
        ]
      },
      {
        label: 'Functions',
        collapsed: true,
        pages: [
          animationFramesPage,
          firstValueFromPage,
          lastValueFromPage,
          pipePage,
          usingPage
        ]
      },
      {
        label: 'Operators',
        children: [
          {
            label: 'Creation Operators',
            collapsed: true,
            pages: [
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
              neverPage,
              ofPage,
              rangePage,
              throwErrorPage,
              timerPage,
              iifPage
            ]
          },
          {
            label: 'Join Creation Operators',
            collapsed: true,
            pages: [
              combineLatestPage,
              concatPage,
              forkJoinPage,
              mergePage,
              onErrorResumeNextPage,
              partitionPage,
              racePage,
              zipPage
            ]
          },
          {
            label: 'Transformation Operators',
            collapsed: true,
            pages: [
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
              windowWhenPage
            ]
          },
          {
            label: 'Filtering Operators',
            collapsed: true,
            pages: [
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
              throttleTimePage
            ]
          },
          {
            label: 'Join Operators',
            collapsed: true,
            pages: [
              combineAllPage,
              combineLatestAllPage,
              combineLatestWithPage,
              concatAllPage,
              concatWithPage,
              endWithPage,
              exhaustAllPage,
              mergeAllPage,
              mergeWithPage,
              onErrorResumeNextWithPage,
              raceWithPage,
              switchAllPage,
              startWithPage,
              withLatestFromPage,
              zipWithPage
            ]
          },
          {
            label: 'Multicasting Operators',
            collapsed: true,
            pages: [
              connectPage,
              connectablePage,
              multicastPage,
              publishPage,
              publishBehaviorPage,
              publishLastPage,
              publishReplayPage,
              sharePage,
              shareReplayPage
            ]
          },
          {
            label: 'Error Handling Operators',
            collapsed: true,
            pages: [
              catchErrorPage,
              retryPage,
              retryWhenPage
            ]
          },
          {
            label: 'Utility Operators',
            collapsed: true,
            pages: [
              tapPage,
              delayPage,
              delayWhenPage,
              dematerializePage,
              finalizePage,
              materializePage,
              repeatPage,
              repeatWhenPage,
              throwIfEmptyPage,
              timeIntervalPage,
              timestampPage,
              timeoutPage,
              timeoutWithPage,
              toArrayPage
            ]
          },
          {
            label: 'Conditional Operators',
            collapsed: true,
            pages: [
              defaultIfEmptyPage,
              everyPage,
              findPage,
              findIndexPage,
              isEmptyPage,
              sequenceEqualPage
            ]
          },
          {
            label: 'Aggregate Operators',
            collapsed: true,
            pages: [
              countPage,
              maxPage,
              minPage,
              reducePage
            ]
          }
        ]
      }
    ]
  }
];
