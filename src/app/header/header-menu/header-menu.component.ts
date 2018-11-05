import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseApiService } from 'src/app/shared/services/base-api.service';
import { IHeaderMenuItem } from 'src/app/shared/interfaces/HeaderMenuItem.interface';
import { Responsive } from 'src/app/shared/responsive.decorator';
import { IResponsiveComponent } from 'src/app/shared/interfaces/ResponsiveComponent.interface';
import { HeaderService } from '../header.service';
import { Subject } from 'rxjs';

@Responsive()
@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements IResponsiveComponent, OnInit {
  isDesktopLG: boolean;
  isDesktop: boolean;
  isSmall: boolean;
  isMobile: boolean;
  menuItems: IHeaderMenuItem[];
  isMenuExpanded: boolean = false;
  isMenuExpanded$: Subject<boolean> = this.headerService.headerMenuExpanded$;

  constructor(private apiService: BaseApiService,
              private headerService: HeaderService,
              private cdRef: ChangeDetectorRef) {
    this.isMenuExpanded$.subscribe( (status: boolean) => {
      this.isMenuExpanded = status;
      this.cdRef.markForCheck();
    });
    this.apiService.getHeaderMenu().subscribe( (data: IHeaderMenuItem[]) => {
      this.menuItems = data;
      this.cdRef.markForCheck();
    });
  }

  ngOnInit() {
  }

  toggleMenu(): void {
    console.log('yap');
    this.isMenuExpanded ? this.headerService.hideHeaderMenuDialog() : this.headerService.showHeaderMenuDialog();
  }
}
