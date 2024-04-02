import {ISection} from "./vizual-rx-sidenav.model";
import {ajaxPage} from "../vizual-rx-page/operators/creation/ajax/ajax.page";
import {bindCallbackPage} from "../vizual-rx-page/operators/creation/bind-callback/bind-callback.page";
import {bindNodeCallbackPage} from "../vizual-rx-page/operators/creation/bind-node-callback/bind-node-callback.page";
import {deferPage} from "../vizual-rx-page/operators/creation/defer/defer.page";
import {emptyPage} from "../vizual-rx-page/operators/creation/empty/empty.page";
import {fromPage} from "../vizual-rx-page/operators/creation/from/from.page";
import {fromEventPage} from "../vizual-rx-page/operators/creation/fromEvent/from-event.page";
import {fromEventPatternPage} from "../vizual-rx-page/operators/creation/fromEventPattern/from-event-pattern.page";
import {generatePage} from "../vizual-rx-page/operators/creation/generate/generate.page";
import {intervalPage} from "../vizual-rx-page/operators/creation/interval/interval.page";
import {ofPage} from "../vizual-rx-page/operators/creation/of/of.page";
import {rangePage} from "../vizual-rx-page/operators/creation/range/range.page";
import {throwErrorPage} from "../vizual-rx-page/operators/creation/throwError/throw-error.page";
import {timerPage} from "../vizual-rx-page/operators/creation/timer/timer.page";
import {iifPage} from "../vizual-rx-page/operators/creation/iif/iif.page";
import {playgroundPage} from "../vizual-rx-page/vizual-rx/playground/playground.page";
import {combineAllPage} from "../vizual-rx-page/operators/join/combine-all/combine-all.page";
import {combineLatestPage} from "../vizual-rx-page/operators/join-creation/combine-latest/combine-latest.page";
import {defaultIfEmptyPage} from "../vizual-rx-page/operators/conditional/default-if-empty/default-if-empty.page";
import {concatPage} from "../vizual-rx-page/operators/join-creation/concat/concat.page";
import {forkJoinPage} from "../vizual-rx-page/operators/join-creation/forkJoin/fork-join.page";
import {mergePage} from "../vizual-rx-page/operators/join-creation/merge/merge.page";
import {partitionPage} from "../vizual-rx-page/operators/join-creation/partition/partition.page";
import {racePage} from "../vizual-rx-page/operators/join-creation/race/race.page";
import {zipPage} from "../vizual-rx-page/operators/join-creation/zip/zip.page";
import {bufferPage} from "../vizual-rx-page/operators/transformation/buffer/buffer.page";
import {bufferCountPage} from "../vizual-rx-page/operators/transformation/buffer-count/buffer-count.page";
import {bufferTimePage} from "../vizual-rx-page/operators/transformation/buffer-time/buffer-time.page";
import {bufferTogglePage} from "../vizual-rx-page/operators/transformation/buffer-toggle/buffer-toggle.page";
import {bufferWhenPage} from "../vizual-rx-page/operators/transformation/buffer-when/buffer-when.page";
import {concatMapPage} from "../vizual-rx-page/operators/transformation/concat-map/concat-map.page";
import {concatMapToPage} from "../vizual-rx-page/operators/transformation/concat-map-to/concat-map-to.page";
import {exhaustPage} from "../vizual-rx-page/operators/transformation/exhaust/exhaust.page";
import {exhaustAllPage} from "../vizual-rx-page/operators/join/exhaust-all/exhaust-all.page";
import {exhaustMapPage} from "../vizual-rx-page/operators/transformation/exhaust-map/exhaust-map.page";
import {expandPage} from "../vizual-rx-page/operators/transformation/expand/expand.page";
import {groupByPage} from "../vizual-rx-page/operators/transformation/group-by/group-by.page";
import {mapPage} from "../vizual-rx-page/operators/transformation/map/map.page";
import {mapToPage} from "../vizual-rx-page/operators/transformation/map-to/map-to.page";
import {mergeMapPage} from "../vizual-rx-page/operators/transformation/merge-map/merge-map.page";
import {mergeMapToPage} from "../vizual-rx-page/operators/transformation/merge-map-to/merge-map-to.page";
import {mergeScanPage} from "../vizual-rx-page/operators/transformation/merge-scan/merge-scan.page";
import {pairwisePage} from "../vizual-rx-page/operators/transformation/pairwise/pairwise.page";
import {
  partitionPage as partitionOperatorPage
} from "../vizual-rx-page/operators/transformation/partition/partition.page";
import {pluckPage} from "../vizual-rx-page/operators/transformation/pluck/pluck.page";
import {scanPage} from "../vizual-rx-page/operators/transformation/scan/scan.page";
import {switchScanPage} from "../vizual-rx-page/operators/transformation/switch-scan/switch-scan.page";
import {switchMapPage} from "../vizual-rx-page/operators/transformation/switch-map/switch-map.page";
import {switchMapToPage} from "../vizual-rx-page/operators/transformation/switch-map-to/switch-map-to.page";
import {windowPage} from "../vizual-rx-page/operators/transformation/window/window.page";
import {windowCountPage} from "../vizual-rx-page/operators/transformation/window-count/window-count.page";
import {windowTimePage} from "../vizual-rx-page/operators/transformation/window-time/window-time.page";
import {windowTogglePage} from "../vizual-rx-page/operators/transformation/window-toggle/window-toggle.page";
import {windowWhenPage} from "../vizual-rx-page/operators/transformation/window-when/window-when.page";
import {auditPage} from "../vizual-rx-page/operators/filtering/audit/audit.page";
import {auditTimePage} from "../vizual-rx-page/operators/filtering/audit-time/audit-time.page";
import {debouncePage} from "../vizual-rx-page/operators/filtering/debounce/debounce.page";
import {debounceTimePage} from "../vizual-rx-page/operators/filtering/debounce-time/debounce-time.page";
import {distinctPage} from "../vizual-rx-page/operators/filtering/distinct/distinct.page";
import {
  distinctUntilChangedPage
} from "../vizual-rx-page/operators/filtering/distinct-until-changed/distinct-until-changed.page";
import {
  distinctUntilKeyChangedPage
} from "../vizual-rx-page/operators/filtering/distinct-until-key-changed/distinct-until-key-changed.page";
import {elementAtPage} from "../vizual-rx-page/operators/filtering/element-at/element-at.page";
import {filterPage} from "../vizual-rx-page/operators/filtering/filter/filter.page";
import {firstPage} from "../vizual-rx-page/operators/filtering/first/first.page";
import {ignoreElementsPage} from "../vizual-rx-page/operators/filtering/ignore-elements/ignore-elements.page";
import {lastPage} from "../vizual-rx-page/operators/filtering/last/last.page";
import {samplePage} from "../vizual-rx-page/operators/filtering/sample/sample.page";
import {sampleTimePage} from "../vizual-rx-page/operators/filtering/sample-time/sample-time.page";
import {singlePage} from "../vizual-rx-page/operators/filtering/single/single.page";
import {skipPage} from "../vizual-rx-page/operators/filtering/skip/skip.page";
import {skipLastPage} from "../vizual-rx-page/operators/filtering/skip-last/skip-last.page";
import {skipUntilPage} from "../vizual-rx-page/operators/filtering/skip-until/skip-until.page";
import {skipWhilePage} from "../vizual-rx-page/operators/filtering/skip-while/skip-while.page";
import {takePage} from "../vizual-rx-page/operators/filtering/take/take.page";
import {takeLastPage} from "../vizual-rx-page/operators/filtering/take-last/take-last.page";
import {takeUntilPage} from "../vizual-rx-page/operators/filtering/take-until/take-until.page";
import {takeWhilePage} from "../vizual-rx-page/operators/filtering/take-while/take-while.page";
import {throttlePage} from "../vizual-rx-page/operators/filtering/throttle/throttle.page";
import {throttleTimePage} from "../vizual-rx-page/operators/filtering/throttle-time/throttle-time.page";
import {combineLatestAllPage} from "../vizual-rx-page/operators/join/combine-latest-all/combine-latest-all.page";
import {concatAllPage} from "../vizual-rx-page/operators/join/concat-all/concat-all.page";
import {mergeAllPage} from "../vizual-rx-page/operators/join/mege-all/merge-all.page";
import {switchAllPage} from "../vizual-rx-page/operators/join/switch-all/switch-all.page";
import {startWithPage} from "../vizual-rx-page/operators/join/start-with/start-with.page";
import {withLatestFromPage} from "../vizual-rx-page/operators/join/with-latest-from/with-latest-from.page";

export const allSectionData: ISection[] = [
  {
    label: 'VizualRx',
    sections: [],
    pages: [playgroundPage]
  },
  {
    label: 'RxJS Operators',
    sections: [
      {
        label: 'Creation',
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
          ofPage,
          rangePage,
          throwErrorPage,
          timerPage,
          iifPage
        ]
      },
      {
        label: 'Join Creation',
        pages: [
          combineLatestPage,
          concatPage,
          forkJoinPage,
          mergePage,
          partitionPage,
          racePage,
          zipPage
        ]
      },
      {
        label: 'Transformation',
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
        label: 'Filtering',
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
        label: 'Join',
        pages: [
          combineAllPage,
          combineLatestAllPage,
          concatAllPage,
          exhaustAllPage,
          mergeAllPage,
          switchAllPage,
          startWithPage,
          withLatestFromPage
        ]
      },
      {
        label: 'Conditional',
        pages: [
          defaultIfEmptyPage
        ]
      }
    ]
  }
];
