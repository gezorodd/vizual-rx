import {Observable} from "rxjs";

/**
 * Add an observable to the visualisation track.
 * @param label The label that will be used in the track
 * @param observable The observable to track
 */
export declare function trackObservable(label: string, observable: Observable<any>): void
