import {ISection} from "./vizual-rx-sidenav.model";
import {combineAllPage} from "../pages/combine-all/combine-all.page";
import {combineLatestPage} from "../pages/combine-latest/combine-latest.page";
import {defaultIfEmptyPage} from "../pages/default-if-empty/default-if-empty.page";
import {playgroundPage} from "../pages/playground/playground.page";
import {ajaxPage} from "../pages/ajax/ajax.page";
import {bindCallbackPage} from "../pages/bind-callback/bind-callback.page";
import {bindNodeCallbackPage} from "../pages/bind-node-callback/bind-node-callback.page";
import {deferPage} from "../pages/defer/defer.page";
import {emptyPage} from "../pages/empty/empty.page";
import {fromPage} from "../pages/from/from.page";
import {fromEventPage} from "../pages/fromEvent/from-event.page";
import {fromEventPatternPage} from "../pages/fromEventPattern/from-event-pattern.page";
import {generatePage} from "../pages/generate/generate.page";
import {intervalPage} from "../pages/interval/interval.page";
import {ofPage} from "../pages/of/of.page";
import {rangePage} from "../pages/range/range.page";
import {throwErrorPage} from "../pages/throwError/throw-error.page";
import {timerPage} from "../pages/timer/timer.page";
import {iifPage} from "../pages/iif/iif.page";

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
        label: 'Combination',
        pages: [
          combineAllPage,
          combineLatestPage
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
