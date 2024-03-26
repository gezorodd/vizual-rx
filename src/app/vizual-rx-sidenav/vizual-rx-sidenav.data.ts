import {ISection} from "./vizual-rx-sidenav.model";
import {combineAllPage} from "../pages/combine-all/combine-all.page";
import {combineLatestPage} from "../pages/combine-latest/combine-latest.page";
import {defaultIfEmptyPage} from "../pages/default-if-empty/default-if-empty.page";
import {playgroundPage} from "../pages/playground/playground.page";

export const allSectionData: ISection[] = [
  {
    label: 'VizualRx',
    sections: [

    ],
    pages: [playgroundPage]
  },
  {
    label: 'RxJS Operators',
    sections: [
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
