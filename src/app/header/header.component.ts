import {Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy} from '@angular/core';
import { Responsive } from '../shared/decorators/responsive.decorator';
import { IResponsiveComponent } from '../shared/interfaces/responsive-component.interface';
import { WindowScrollService } from '../shared/services/window-scroll.service';
import { Subject } from 'rxjs';
import { DeviceWindowService } from '../shared/services/device-window.service';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import {debounceTime, delay, filter, takeUntil} from 'rxjs/operators';

@Responsive()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy, IResponsiveComponent {
  @ViewChild('header') headerNode: ElementRef;
  isHeaderFixed$: Subject<boolean> = new Subject();
  isMobile: boolean;
  isSmall: boolean;
  OnDestroy$: Subject<void> = new Subject<void>();

  constructor(private scrollService: WindowScrollService,
              private deviceService: DeviceWindowService) {
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.deviceService.onResize$
      .pipe(
        delay(this.scrollService.delayTime),
        takeUntil(this.OnDestroy$)
      )
      .subscribe(() => {
        const breakpoint = this.headerNode.nativeElement.offsetTop;
        this.scrollService.addScrollListener(breakpoint, this.constructor.name, this.isHeaderFixed$);
    });
  }

  ngOnDestroy() {
    this.OnDestroy$.next();
    this.OnDestroy$.complete();
  }
}
