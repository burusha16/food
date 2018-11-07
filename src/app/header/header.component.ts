import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseApiService } from '../shared/services/base-api.service';
import { IHeaderMenuItem } from '../shared/interfaces/header-menu-item.interface';
import { Responsive } from '../shared/responsive.decorator';
import { IResponsiveComponent } from '../shared/interfaces/responsive-component.interface';
import { WindowScrollService } from '../shared/services/window-scroll.service';
import { Subject } from 'rxjs';

@Responsive()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, IResponsiveComponent {
  isDesktopLG: boolean;
  isDesktop: boolean;
  isSmall: boolean;
  isMobile: boolean;
  menuItems: IHeaderMenuItem[];
  scrollStatus$: Subject<boolean> = new Subject();

  constructor(private scrollService: WindowScrollService) {
    this.scrollStatus$.subscribe(() => console.log('yap!'));
  }

  ngOnInit() {
    this.scrollService.breakpointPassed(45, this.scrollStatus$);
  }
}
