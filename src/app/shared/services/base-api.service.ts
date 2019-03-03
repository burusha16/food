import {Injectable, isDevMode} from '@angular/core';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import {map, publishReplay, refCount, catchError, retry, tap} from 'rxjs/operators';
import { IOffer } from '../interfaces/offers.interface';
import { IOffersResponse } from '../interfaces/offers-response.interface';
import { Offer } from '../models/offer.model';
import { AppService } from './base-app.service';
import {TransferHttpService} from '@gorniv/ngx-transfer-http';
import {MenuService} from '../../pages/menu/menu.service';

@Injectable({providedIn: 'root'})
export class BaseApiService {
  private BASE_URL = 'api/';
  private CACHE_SIZE = 1;
  private RETRY_VALUE = 3;

  static serialize(object: any): HttpParams {
    return new HttpParams({ fromObject: object });
  }

  constructor(protected http: TransferHttpService,
              private appService: AppService,
              private menuService: MenuService) {
  }

  private get<R>(url: string, params?: HttpParams): Observable<R> {
    return this.http.get<R>(url, { params: params, withCredentials: true })
      .pipe(
        retry(this.RETRY_VALUE),
        catchError(this.handleError)
      );
  }

  get offers$(): Observable<IOffer[]> {
    const url = isDevMode() ? 'api/actual.json' : 'https://api.partiyaedi.ru/api/v3/goods/actual';
    return this.get(url)
      .pipe(
        map((response: IOffersResponse) => {
          this.appService.actualWeekKey = response.defaultWeekKey;
          return response.goods.map((offer: IOffer) => new Offer(offer));
        }),
        tap((offers: Offer[]) => {
          this.menuService.offers = offers;
        }),
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
