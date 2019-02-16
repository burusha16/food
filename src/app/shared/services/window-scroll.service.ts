import {Injectable} from '@angular/core';
import {EventManager} from '@angular/platform-browser';
import {merge, Observable, Subject} from 'rxjs';
import {ServiceLocator} from '@shared/services/locator.service';
import {NavigationEnd, Router} from '@angular/router';
import {delay, filter} from 'rxjs/operators';
import {DeviceWindowService} from '@shared/services/device-window.service';

export interface IScrollListener {
  breakpoint: number;
  observerable: Subject<boolean>;
  lastScrollPosition: number;
  container?: HTMLElement;
}

@Injectable({providedIn: 'root'})
export class WindowScrollService {
  listeners: Map<string, IScrollListener> = new Map<string, IScrollListener>();
  pageUpdated$!: Observable<any>;

  constructor(private eventManager: EventManager,
              private router: Router,
              private deviceService: DeviceWindowService) {
    if (ServiceLocator.isBrowser) {
      this.eventManager.addGlobalEventListener('window', 'scroll', () => {
        this.listeners.forEach((listener: IScrollListener) => this.detectScroll(listener));
      });
    }
    const navigationEnd$ = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      );
    this.pageUpdated$ = merge(this.deviceService.onResize$, navigationEnd$)
      .pipe(delay(100));
  }

  addScrollListener(breakpoint: number, name: string, subject$: Subject<boolean>, container?: HTMLElement): void {
    this.removeListener(name);
    this.listeners.set(name, {
      breakpoint: breakpoint,
      observerable: subject$,
      lastScrollPosition: this.getScrollPosition(container),
      container: container
    });
    const currentListener = this.listeners.get(name);
    if (container) {
      this.eventManager.addEventListener(container, 'scroll', () => {
        this.detectScroll(currentListener);
      });
    }
  }

  removeListener(name: string): void {
    if (this.listeners.has(name)) {
      this.listeners.delete(name);
    }
  }

  getScrollPosition(container: HTMLElement): number {
    if (ServiceLocator.isBrowser) {
      return container ? container.scrollTop : window.scrollY;
    }
    return 0;
  }

  detectScroll(listener: IScrollListener): void {
    const scrollPosition = this.getScrollPosition(listener.container);
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
      document.body.style.width = `${document.body.offsetWidth}px`;
      document.body.style.overflowY = 'hidden';
    }
  }
}
