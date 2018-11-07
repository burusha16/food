import { Injectable } from "@angular/core";
import { HttpParams, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IHeaderMenuItem } from "../interfaces/header-menu-item.interface";
import { map, publishReplay, refCount } from "rxjs/operators";
import { HeaderMenuItem } from "../models/header-menu-item.model";

@Injectable() 
export class BaseApiService {
  private BASE_URL = 'api/';
  protected URL: string;
  private CACHE_SIZE = 1;

  static serialize(object: any): HttpParams {
    return new HttpParams({ fromObject: object });
  }

  constructor(protected http: HttpClient) {
  }

  post<T, R>(nameEndPoint: string, data: T): Observable<R> {
    return this.http.post<R>(`${this.BASE_URL}${this.URL}${nameEndPoint}`, data);
  }

  get<R>(endPointName: string, isLocalRequsest = true, params?: HttpParams): Observable<R> {
    const URL = isLocalRequsest ? `${this.BASE_URL}${endPointName}.json` : `${this.BASE_URL}${this.URL}${endPointName}`;
    return this.http.get<R>(URL, { params: params, withCredentials: true });
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
}
