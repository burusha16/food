import { Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Subject } from 'rxjs';

@Injectable()
export class WindowScrollService {
  public lastScrollPosition: number;

  constructor(private eventManager: EventManager) {
  }

  breakpointPassed(breakpoint: number, subject$: Subject<boolean>): void {
    const scrollPosition = window.scrollY;
    const passBreakpointDown = this.lastScrollPosition < breakpoint && scrollPosition >= breakpoint;
    const passBreakpointUp = this.lastScrollPosition > breakpoint && scrollPosition <= breakpoint;

    this.eventManager.addGlobalEventListener('window', 'scroll', () => {
      if (passBreakpointDown || passBreakpointUp) {
        subject$.next(breakpoint > scrollPosition);
      }
    });
  }
}
