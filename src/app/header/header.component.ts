import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';
import { Responsive } from '../shared/decorators/responsive.decorator';
import { IResponsiveComponent } from '../shared/interfaces/responsive-component.interface';
import { WindowScrollService } from '../shared/services/window-scroll.service';
import { Subject } from 'rxjs';
import { DeviceWindowService } from '../shared/services/device-window.service';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import {debounceTime, delay, filter} from 'rxjs/operators';

@Responsive()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, IResponsiveComponent {
  @ViewChild('header') headerNode: ElementRef;
  isHeaderFixed$: Subject<boolean> = new Subject();
  isMobile: boolean;
  isSmall: boolean;

  constructor(private scrollService: WindowScrollService,
              private deviceService: DeviceWindowService,
              private router: Router) {
    this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        delay(10))
      .subscribe(() => {
        if (this.headerNode) {
          this.scrollService.addScrollListener(this.headerNode.nativeElement, this.constructor.name, this.isHeaderFixed$);
        }
      });
    }

  ngOnInit() {}

  ngAfterViewInit() {
    this.deviceService.onResize$.subscribe(() => {
      if (this.headerNode) {
        this.scrollService.addScrollListener(this.headerNode.nativeElement, this.constructor.name, this.isHeaderFixed$);
      }
    });
  }
}
