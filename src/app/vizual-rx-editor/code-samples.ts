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
import {trackObservable} from "vizual-rx";

const obs = interval(1000)
  .pipe(
    take(5)
  );
trackObservable('interval', obs);
`),
  new CodeSample('delay', `import {of, delay} from "rxjs";
import {trackObservable} from "vizual-rx";

const obs = of('ok')
    .pipe(
        delay(2000)
    );
trackObservable('interval', obs);
`),
  new CodeSample('timeout', `import {of, delay, timeout} from "rxjs";
import {trackObservable} from "vizual-rx";

const obsOk = of('ok')
    .pipe(
        delay(1000),
        timeout(2000)
    );
trackObservable('successful timeout', obsOk);

const obsFail = of('fail')
    .pipe(
        delay(3000),
        timeout(0)
    );
trackObservable('failed timeout', obsFail);
`),
  new CodeSample('debounce time', `import {interval, take, debounceTime} from "rxjs";
import {trackObservable} from "vizual-rx";

const obs = interval(1000)
  .pipe(
    debounceTime(500)
  );
trackObservable('interval', obs);
`)
];
