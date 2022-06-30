import { Injectable } from '@angular/core';
import {
  HttpBackend,
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient,
    handler:HttpBackend) {
      this.http = new HttpClient(handler);
     }

  get<T>():Observable<T> {
    return this.httpRequest(
      this.http.get(environment.path + 'employeeLists')
    )as Observable<T>;

  }
  
  // TODO: Use http interceptor instead
  private httpRequest(response: Observable<Object>): Observable<Object> {
    return response.pipe(
      tap(() => {}),
      catchError((err: HttpErrorResponse) => {
        // if ((err.status === 400) || (err.status === 404)) {
        //   alert(err.error.message);
        return throwError(err);
        // }
      })
    );
  }
}
