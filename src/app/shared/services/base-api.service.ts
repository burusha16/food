import { Injectable } from "@angular/core";
import { HttpParams, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IHeaderMenuItem } from "../interfaces/HeaderMenuItem.interface";
import { map } from "rxjs/operators";
import { HeaderMenuItem } from "../models/HeaderMenuItem.model";

@Injectable() 
export class BaseApiService {
  private BASE_URL = 'api/';
  protected URL: string;

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
      .pipe(map((menu: IHeaderMenuItem[]) => 
      menu.map((menuItem: IHeaderMenuItem) => new HeaderMenuItem(menuItem))
      ));
  }
}
