import { Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { DeviceMediaMap } from '../enums/device-media.map';
import { IResponsiveComponent } from '../interfaces/responsive-component.interface';

@Injectable({
  providedIn: 'root'
})
export class DeviceWindowService {
  private windowDetect: WindowDetect = new WindowDetect();
  private windowSubject: BehaviorSubject<WindowDetect> = new BehaviorSubject<WindowDetect>(this.windowDetect);
  previousStatre: string;

  constructor(private eventManager: EventManager) {
    this.eventManager.addGlobalEventListener('window', 'resize', e => {
      this.windowDetect.detectDevice();
      if (this.windowDetect.deviceChanged) {
        this.windowSubject.next(this.windowDetect);
      }
    });
  }

  get onResize$(): BehaviorSubject<WindowDetect> {
    return this.windowSubject;
  }
}

export class WindowDetect implements IResponsiveComponent {
  deviceChanged: boolean;
  isSmall: boolean;
  
  constructor() {
    this.detectDevice();
  }

  apply(component: IResponsiveComponent) {
    DeviceMediaMap.forEach((value: string, key: string) => {
      component[key] = this[key];
    });
  }

  detectDevice() {
    this.deviceChanged = false;
    DeviceMediaMap.forEach((value: string, key: string) => {
      const newValue = window.matchMedia(`(${value})`).matches;
      this.deviceChanged = (this[key] === newValue) ? this.deviceChanged : true;
      this[key] = newValue;
    });
  }
}
