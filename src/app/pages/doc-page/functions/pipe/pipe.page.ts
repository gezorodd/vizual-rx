import {DocPage} from "../../doc-page.model";
import {PipeDetailsComponent} from "./pipe-details/pipe-details.component";

export const pipePage: DocPage = {
  title: 'pipe',
  routeUrl: 'functions/pipe',
  detailsComponent: PipeDetailsComponent,
  documentationUrl: 'https://rxjs.dev/api/index/function/pipe',
  sampleCode: `import {pipe, timer, map, take, filter, tap, bufferCount, UnaryFunction, Observable} from "rxjs";
import {observe, createValue, colorAt, shapeAt, VizualRxValue} from "vizual-rx";

declare type VizualRxValueToArrayObs =
    UnaryFunction<Observable<VizualRxValue>, Observable<VizualRxValue[]>>;

function groupOf3BlueAsTriangles(): VizualRxValueToArrayObs {
    return pipe(
        filter(shape => shape.color === 'blue'),
        map(shape => createValue(shape.color, 'triangle')),
        bufferCount(3),
    );
}

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i % 3), shapeAt(i % 2))),
        take(10)
    );

const example$ = source$
    .pipe(
        groupOf3BlueAsTriangles()
    );

source$
    .subscribe(observe('source'));
example$
    .subscribe(observe('example'));`
};
