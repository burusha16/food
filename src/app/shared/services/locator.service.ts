
import { InjectFlags, InjectionToken, Injector, Type } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

export class ServiceLocator {
  static injector: Injector;
  static sanitizer: DomSanitizer;
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
}
