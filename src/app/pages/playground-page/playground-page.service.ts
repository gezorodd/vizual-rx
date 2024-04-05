import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlaygroundPageService {

  private readonly code$: BehaviorSubject<string>;

  constructor() {
    this.code$ = new BehaviorSubject<string>('');
  }

  get code(): string {
    return this.code$.value;
  }

  set code(value: string) {
    this.code$.next(value);
  }
}
