import {Page} from "../../sidenav/sidenav.model";

export const overviewPage: Page = {
  title: 'Overview',
  routeUrl: 'overview'
}

export const basicExampleCode = `import {timer, take} from "rxjs";
import {observe} from "vizual-rx";

const example$ = timer(0, 500)
    .pipe(
        take(5)
    );
example$
    .subscribe(observe('example'));`;

export const createValueExampleCode = `import {of} from "rxjs";
import {observe, createValue} from "vizual-rx";

const randomValue$ = of(createValue());
randomValue$
    .subscribe(observe('a random value'));

const redValue$ = of(createValue('red'));
redValue$
    .subscribe(observe('a red value'));

const square$ = of(createValue('square'));
square$
    .subscribe(observe('a square'));

const blueCircle$ = of(createValue('blue', 'circle'));
blueCircle$
    .subscribe(observe('a blue circle'));`;

export const colorAndShapeAtExampleCode = `import {timer, map, take} from "rxjs";
import {observe, createValue, colorAt, shapeAt} from "vizual-rx";

const colors$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i), 'circle')),
        take(10)
    );
colors$
    .subscribe(observe('colors'));

const shapes$ = timer(0, 500)
    .pipe(
        map(i => createValue(shapeAt(i), 'blue')),
        take(10)
    );
shapes$
    .subscribe(observe('shapes'));`;

export const arrayExampleCode = `import {timer, map, take} from "rxjs";
import {observe, createValue, colorAt, shapeAt} from "vizual-rx";

const arrays$ = timer(0, 1000)
    .pipe(
        map(i => {
            const values = [];
            for (let j = 0; j <= i; j++) {
                values.push(createValue(colorAt(i), shapeAt(j)));
            }
            return values;
        }),
        take(5)
    );
arrays$
    .subscribe(observe('arrays'));`;

export const miscExampleCode = `import {EMPTY, throwError, of} from "rxjs";
import {observe} from "vizual-rx";

EMPTY
    .subscribe(observe('empty'));

throwError('Content of the error')
    .subscribe(observe('error'));

const myObject = {id: 123, firstName: 'John', lastName: 'Doe'};
of(myObject)
    .subscribe(observe('object'));`

export const pipeExampleCode = `import {timer, map, take, filter, tap, bufferCount} from "rxjs";
import {observe, createValue, colorAt, shapeAt} from "vizual-rx";

const source$ = timer(0, 500)
    .pipe(
        map(i => createValue(colorAt(i % 3), shapeAt(i % 2))),
        take(10)
    );
source$
    .subscribe(observe('source'));

const piped$ = source$
    .pipe(
        filter(shape => shape.color === 'blue'),
        tap(observe('filtered')),
        map(shape => createValue(shape.color, 'triangle')),
        tap(observe('mapped')),
        bufferCount(3),
        tap(observe('buffered'))
    );
piped$
    .subscribe();`;
