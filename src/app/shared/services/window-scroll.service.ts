import {Injectable} from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import {ServiceLocator} from '@shared/services/locator.service';

export interface IScrollListener {
  breakpoint: number;
  observerable: Subject<boolean>;
  lastScrollPosition: number;
}

@Injectable({
  providedIn: 'root',
})
export class WindowScrollService {
  listeners: Map<string, IScrollListener> = new Map<string, IScrollListener>();
  delayTime = 100;

  constructor(private eventManager: EventManager) {
    if (ServiceLocator.isBrowser) {
      this.eventManager.addGlobalEventListener('window', 'scroll', () => {
        this.listeners.forEach((listener: IScrollListener) => this.detectScroll(listener));
      });
    }
  }

  addScrollListener(breakpoint: number, name: string, subject$: Subject<boolean>): void {
    this.removeListener(name);
    this.listeners.set(name , {
      breakpoint: breakpoint,
      observerable: subject$,
      lastScrollPosition: ServiceLocator.isBrowser ? window.scrollY : 0
    });
  }

  removeListener(name: string): void {
    if (this.listeners.has(name)) {
      this.listeners.delete(name);
    }
  }

  detectScroll(listener: IScrollListener): void {
    const scrollPosition = ServiceLocator.isBrowser ? window.scrollY : 0;
    const passBreakpointDown = listener.lastScrollPosition < listener.breakpoint && scrollPosition >= listener.breakpoint;
    const passBreakpointUp = listener.lastScrollPosition > listener.breakpoint && scrollPosition <= listener.breakpoint;
    listener.lastScrollPosition = scrollPosition;
    if (passBreakpointDown) {
      listener.observerable.next(listener.breakpoint <= scrollPosition);
    } else if (passBreakpointUp) {
      listener.observerable.next(listener.breakpoint < scrollPosition);
    }
  }

  enableWindowScroll(): void {
    if (ServiceLocator.isBrowser) {
      document.body.removeAttribute('style');
    }
  }

  disableWindowScroll(): void {
    if (ServiceLocator.isBrowser) {
      document.body.style.height = '100vh';
      document.body.style.overflowY = 'hidden';
      window.scrollTo(0, 0);
    }
  }
}
