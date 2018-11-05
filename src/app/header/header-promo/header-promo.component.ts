import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DeviceWindowService } from 'src/app/shared/services/device-window.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { IResponsiveComponent } from 'src/app/shared/interfaces/ResponsiveComponent.interface';
import { Responsive } from 'src/app/shared/decorators/responsive.decorator';

@Responsive()
@Component({
  selector: 'app-header-promo',
  templateUrl: './header-promo.component.html',
  styleUrls: ['./header-promo.component.scss']
})
export class HeaderPromoComponent implements OnDestroy, IResponsiveComponent {
  isDesktopLG: boolean;
  isDesktop: boolean;
  isSmall: boolean;
  isMobile: boolean;
  onDestroy$: Subject<void> = new Subject();

  constructor(private deviceService: DeviceWindowService,
              private cdRef: ChangeDetectorRef) {
    this.deviceService.onResize
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.cdRef.markForCheck();
      })
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  navigateToPromo() {
    console.log('navigate!');
  }
}
