import {Injectable} from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import {ServiceLocator} from '@shared/services/locator.service';

export interface IScrollListener {
  breakpoint: number;
  name: string;
  observerable: Subject<boolean>;
}

@Injectable()
export class WindowScrollService {
  lastScrollPosition: number;
  listeners: IScrollListener[] = [];

  constructor(private eventManager: EventManager) {
    this.lastScrollPosition = ServiceLocator.isBrowser ? window.scrollY : 0;
    if (ServiceLocator.isBrowser) {
      this.eventManager.addGlobalEventListener('window', 'scroll', () => {
        this.listeners.forEach((listener: IScrollListener) => this.detectScroll(listener));
      });
    }
  }

  addScrollListener(breakpoint: number, name: string,  subject$: Subject<boolean>): void {
    this.removeListener(name);
    this.listeners.push({
      breakpoint: breakpoint,
      name: name,
      observerable: subject$
    });
  }

  removeListener(name: string): void {
    this.listeners = this.listeners.filter((listener: IScrollListener) => listener.name !== name);
  }

  detectScroll(listener: IScrollListener): void {
    const scrollPosition = ServiceLocator.isBrowser ? window.scrollY : 0;
    const passBreakpointDown = this.lastScrollPosition < listener.breakpoint && scrollPosition >= listener.breakpoint;
    const passBreakpointUp = this.lastScrollPosition > listener.breakpoint && scrollPosition <= listener.breakpoint;

    this.lastScrollPosition = scrollPosition;
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
