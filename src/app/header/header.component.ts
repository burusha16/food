import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseApiService } from '../shared/services/base-api.service';
import { IHeaderMenuItem } from '../shared/interfaces/HeaderMenuItem.interface';
import { Responsive } from '../shared/responsive.decorator';
import { IResponsiveComponent } from '../shared/interfaces/ResponsiveComponent.interface';

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

  constructor() {
  }

  ngOnInit() {
  }
}
