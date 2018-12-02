import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { Responsive } from '../../shared/decorators/responsive.decorator';
import { DeviceWindowService } from '../../shared/services/device-window.service';
import { IResponsiveComponent } from '../../shared/interfaces/responsive-component.interface';

@Responsive()
@Component({
  selector: 'app-header-promo',
  templateUrl: './header-promo.component.html',
  styleUrls: ['./header-promo.component.scss']
})
export class HeaderPromoComponent implements OnDestroy, OnInit, IResponsiveComponent {
  isMobile: boolean;
  isSmall: boolean;
  onDestroy$: Subject<void> = new Subject();

  constructor(private deviceService: DeviceWindowService,
              private cdRef: ChangeDetectorRef) {
    this.deviceService.onResize$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.cdRef.markForCheck();
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  navigateToPromo() {
    console.log('navigate!');
  }
}
