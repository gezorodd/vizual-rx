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
        label: 'Join',
        pages: [
          combineAllPage
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
