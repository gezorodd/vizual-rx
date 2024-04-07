export const playGroundCode = `import {delay, of, expand, map, share, race, first,
    skip, distinctUntilChanged, find, takeUntil} from "rxjs";
import {observe, createValue} from "vizual-rx";

const randomEmit$ = of(0)
    .pipe(
        expand(value => {
            const newValue = Math.random() > 0.5 ? value + 1 : value;
            const dueTime = 500 + Math.floor(Math.random() * 500);
            return of(newValue)
                .pipe(delay(dueTime));
        }),
        skip(1),
        distinctUntilChanged()
    );

const add$ = randomEmit$
    .pipe(
        map(() => createValue('green', 'circle')),
        share()
    );

const remove$ = randomEmit$
    .pipe(
        map(() => createValue('red', 'circle')),
        share()
    );

const counter$ = of(0)
    .pipe(
        expand(counter =>
            race(
                add$
                    .pipe(map(() => counter + 1)),
                remove$
                    .pipe(map(() => counter - 1))
            ).pipe(first())
        )
    );

const finished$ = counter$
    .pipe(
        find(value => Math.abs(value) >= 3),
        map(() => createValue('purple', 'diamond')),
        delay(0)
    );

add$
    .pipe(takeUntil(finished$))
    .subscribe(observe('add'));
remove$
    .pipe(takeUntil(finished$))
    .subscribe(observe('remove'));
counter$
    .pipe(takeUntil(finished$))
    .subscribe(observe('counter'));
finished$
    .subscribe(observe('finished'));`;
