import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { BaseApiService } from 'src/app/shared/services/base-api.service';
import { IHeaderMenuItem } from 'src/app/shared/interfaces/HeaderMenuItem.interface';
import { Responsive } from 'src/app/shared/responsive.decorator';
import { IResponsiveComponent } from 'src/app/shared/interfaces/ResponsiveComponent.interface';

@Responsive()
@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements IResponsiveComponent {
  isDesktopLG: boolean;
  isDesktop: boolean;
  isSmall: boolean;
  isMobile: boolean;
  menuItems: IHeaderMenuItem[];
  isMenuExpanded: boolean;

  constructor(private apiService: BaseApiService,
              private cdRef: ChangeDetectorRef) {
    this.isMenuExpanded = false;
    this.apiService.getHeaderMenu().subscribe( (data: IHeaderMenuItem[]) => {
      this.menuItems = data;
      this.cdRef.markForCheck();
    });
  }

  toggleMenu() {
    this.isMenuExpanded = !this.isMenuExpanded;
  }
}
