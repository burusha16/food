import { Injectable } from '@angular/core';
import { HttpResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestCacheService {
  private cache = new Map<string, [Date, HttpResponse<any>]>();
  private cacheDefaultLiveTime = 120;  // in seconds

  get(key): HttpResponse<any> {
    const tuple = this.cache.get(key);
    if (!tuple) return null;
    const expires = tuple[0];
    const httpResponse = tuple[1];
    const now = new Date();
    if (expires && expires.getTime() < now.getTime()) {
      this.cache.delete(key);
      return null;
    }

    return httpResponse;
  }

  set(key, value, liveTime = this.cacheDefaultLiveTime) {
    if (liveTime) {
      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + liveTime);
      this.cache.set(key, [expires, value]);
    }
  }
}

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCacheService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const cachedResponse = this.cache.get(req.url);
    return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next);
  }

  sendRequest(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).
      pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.url, event);
        }
      }));
  }
}