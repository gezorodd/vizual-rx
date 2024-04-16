import {ErrorHandler, inject, NgZone} from "@angular/core";
import {Router} from "@angular/router";
import {ScriptNotFoundError} from "../script/script.service";
import {ErrorService} from "./error.service";
import {noop} from "rxjs";

export class GlobalErrorHandler implements ErrorHandler {
  private readonly router: Router;
  private readonly ngZone: NgZone;
  private readonly errorService: ErrorService;

  constructor() {
    this.router = inject(Router);
    this.ngZone = inject(NgZone);
    this.errorService = inject(ErrorService);
  }

  handleError(error: any): void {
    console.error(error);
    if (error instanceof ScriptNotFoundError) {
      this.ngZone.run(() => {
        this.router.navigate(['error'], {state: {error}, skipLocationChange: true})
          .then(noop);
      });
      return;
    }
    this.errorService.notifyError();
  }
}
