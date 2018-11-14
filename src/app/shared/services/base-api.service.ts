import { Injectable } from "@angular/core";
import { HttpParams, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { IHeaderMenuItem } from "../interfaces/header-menu-item.interface";
import { map, publishReplay, refCount, catchError, retry } from "rxjs/operators";
import { HeaderMenuItem } from "../models/header-menu-item.model";

@Injectable() 
export class BaseApiService {
  private BASE_URL = 'api/';
  private CACHE_SIZE = 1;
  private RETRY_VALUE = 3;

  static serialize(object: any): HttpParams {
    return new HttpParams({ fromObject: object });
  }

  constructor(protected http: HttpClient) {
  }

  private get<R>(endPointName: string, params?: HttpParams): Observable<R> {
    const URL = `${this.BASE_URL}${endPointName}.json`;
    return this.http.get<R>(URL, { params: params, withCredentials: true })
      .pipe(
        retry(this.RETRY_VALUE),
        catchError(this.handleError)
      );
  }

  getHeaderMenu(): Observable<HeaderMenuItem[]> {
    return this.get('header-menu')
      .pipe(
        map((response: IHeaderMenuItem[]) =>
          response.map((menuItem: IHeaderMenuItem) => new HeaderMenuItem(menuItem))
        ),
        publishReplay(this.CACHE_SIZE),
        refCount()
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError (
      'Something bad happened; please try again later.');
  };
}
