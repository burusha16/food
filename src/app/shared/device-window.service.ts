import { Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';

import { DeviceMediaMap } from './enums/device-media.map';
import { IResponsiveComponent } from './interfaces/ResponsiveComponent.interface';

@Injectable({
  providedIn: 'root'
})
export class DeviceWindowService {
  private windowDetect: WindowDetect = new WindowDetect();
  private windowSubject: BehaviorSubject<WindowDetect> = new BehaviorSubject<WindowDetect>(this.windowDetect);

  constructor(private eventManager: EventManager) {
    this.eventManager.addGlobalEventListener('window', 'resize', e => {
      this.windowDetect.detectDevice(e.target.innerWidth, e.target.innerHeight);
      this.windowSubject.next(this.windowDetect);
    });
  }

  get onResize(): Observable<WindowDetect> {
    return this.windowSubject.asObservable();
  }
}

export class WindowDetect implements IResponsiveComponent {
  isDesktop: boolean;
  isDesktopLG: boolean;
  isMobile: boolean;
  isTablet: boolean;
  public windowWidth: number;
  public windowHeight: number;

  constructor() {
    this.resetDevices();
    this.detectDevice(window.innerWidth, window.innerHeight);
  }

  apply(component: IResponsiveComponent) {
    DeviceMediaMap.forEach((value: string, key: string) => {
      component[key] = this[key];
    });
  }

  resetDevices() {
    DeviceMediaMap.forEach((value: string, key: string) => {
      this[key] = false;
    });
  }

  detectDevice(windowWidth: number, windowHeight: number) {
    this.resetDevices();
    DeviceMediaMap.forEach((value: string, key: string) => {
      this[key] = window.matchMedia(`(${value})`).matches;
    });
  }
}
