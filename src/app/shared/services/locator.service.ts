
import { InjectFlags, InjectionToken, Injector, Type } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';

export class ServiceLocator {
  static injector: Injector;
  static platformId: string;

  static get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): T {
    try {
      return ServiceLocator.injector.get<T>(token, notFoundValue, flags);
    } catch (e) {
      return null;
    }
  }

  static get translate(): TranslateService {
    return ServiceLocator.get(TranslateService);
  }

  static get isServer(): boolean {
    return isPlatformServer(ServiceLocator.platformId);
  }

  static get isBrowser(): boolean {
    return isPlatformBrowser(ServiceLocator.platformId);
  }
}
