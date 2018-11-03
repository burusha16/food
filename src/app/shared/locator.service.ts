
import { InjectFlags, InjectionToken, Injector, Type } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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
}
