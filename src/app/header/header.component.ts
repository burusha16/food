import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Responsive } from '../shared/responsive.decorator';
import { IResponsiveComponent } from '../shared/interfaces/responsive-component.interface';
import { WindowScrollService } from '../shared/services/window-scroll.service';
import { Subject } from 'rxjs';
import { DeviceWindowService } from '../shared/services/device-window.service';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Responsive()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit, IResponsiveComponent {
  @ViewChild('header') headerNode: ElementRef;
  isHeaderFixed$: Subject<boolean> = new Subject();
  isMobile: boolean;
  isSmall: boolean;

  constructor(private scrollService: WindowScrollService,
              private deviceService: DeviceWindowService,
              private router: Router) {
    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.headerNode) {
          const breakpoint = this.headerNode.nativeElement.offsetTop;
          this.scrollService.removeListeners(this.constructor.name);
          this.scrollService.addScrollListener(breakpoint, this.constructor.name, this.isHeaderFixed$);
        }
      });
    }

  ngAfterViewInit() {
    this.deviceService.onResize$.subscribe(() => {
      const breakpoint = this.headerNode.nativeElement.offsetTop;
      if (breakpoint) {
        this.scrollService.removeListeners(this.constructor.name);
        this.scrollService.addScrollListener(breakpoint, this.constructor.name, this.isHeaderFixed$);
      }
    });
  }           
}
