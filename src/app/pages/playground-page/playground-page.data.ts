export const playGroundCode = `import {mergeMap, switchMap, exhaustMap, concatMap, timer, map,
    take, Observable} from "rxjs";
import {observe, createValue, colorAt, VizualRxValue} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i), 'square')),
        take(4)
    );

source$
    .subscribe(observe('source'));
source$
    .pipe(mergeMap(value => inner(value)))
    .subscribe(observe('mergeMap'));
source$
    .pipe(switchMap(value => inner(value)))
    .subscribe(observe('switchMap'));
source$
    .pipe(exhaustMap(value => inner(value)))
    .subscribe(observe('exhaustMap'));
source$
    .pipe(concatMap(value => inner(value)))
    .subscribe(observe('concatMap'));

function inner(value: VizualRxValue): Observable<VizualRxValue> {
    return timer(0, 500)
        .pipe(
            map(() => createValue(value.color, 'circle')),
            take(3)
        );
}`;
