import { Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Subject } from 'rxjs';

@Injectable()
export class WindowScrollService {
  public lastScrollPosition: number;

  constructor(private eventManager: EventManager) {
    this.lastScrollPosition = window.scrollY;
  }

  breakpointPassed(breakpoint: number, subject$: Subject<boolean>): void {
    this.eventManager.addGlobalEventListener('window', 'scroll', () => {
      const scrollPosition = window.scrollY;
      const passBreakpointDown = this.lastScrollPosition < breakpoint && scrollPosition >= breakpoint;
      const passBreakpointUp = this.lastScrollPosition > breakpoint && scrollPosition <= breakpoint;

      this.lastScrollPosition = scrollPosition;
      if (passBreakpointDown || passBreakpointUp) {
        subject$.next(breakpoint <= scrollPosition);
      }
    });
  }

  enableWindowScroll() {
    document.body.removeAttribute('style');
  }

  disableWindowScroll() {
    document.body.style.height = '100vh';
    document.body.style.overflowY = 'hidden';
  }
}
