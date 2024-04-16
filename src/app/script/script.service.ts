import {Injectable} from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {Script} from "./script.model";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  private readonly scriptsUrl = `${environment.apiUrl}/api/scripts`;

  constructor(private http: HttpClient) {
  }

  public createScript(content: string): Observable<Script> {
    return this.http.post<string>(this.scriptsUrl, content, {responseType: 'text' as 'json'})
      .pipe(
        map(id => ({
          id,
          content
        }))
      );
  }

  public getScript(id: string): Observable<Script> {
    return this.http.get<Script>(`${this.scriptsUrl}/${id}`)
      .pipe(
        catchError(err => throwError(() => {
          if (err.status === 404) {
            return new ScriptNotFoundError(id);
          } else {
            return err;
          }
        }))
      );
  }
}

export class ScriptNotFoundError extends Error {
  constructor(id: string) {
    super(`Script not found for id: ${id}`);
  }
}
