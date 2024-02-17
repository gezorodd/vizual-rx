export class CodeSample {
  readonly label: string;
  readonly code: string;

  constructor(label: string, code: string) {
    this.label = label;
    this.code = code;
  }
}

export const codeSamples: CodeSample[] = [
  new CodeSample('interval', `import {interval, take} from "rxjs";
import {observe} from "vizual-rx";

const obs = interval(1000)
  .pipe(
    take(5)
  );
obs.subscribe(observe('interval'));
`),
  new CodeSample('delay', `import {of, delay} from "rxjs";
import {observe} from "vizual-rx";

const obs = of('ok')
    .pipe(
        delay(2000)
    );
obs.subscribe(observe('delay'));
`),
  new CodeSample('timeout', `import {of, delay, timeout} from "rxjs";
import {observe} from "vizual-rx";

const obsOk = of('ok')
    .pipe(
        delay(1000),
        timeout(2000)
    );
const obsFail = of('fail')
    .pipe(
        delay(3000),
        timeout(2000)
    );

obsOk.subscribe(observe('successful timeout'));
obsFail.subscribe(observe('failed timeout'));
`),
  new CodeSample('debounce time', `import {interval, debounceTime} from "rxjs";
import {observe} from "vizual-rx";

const obs = interval(1000)
  .pipe(
    debounceTime(500)
  );
obs.subscribe(observe('debounce'));
`)
];
