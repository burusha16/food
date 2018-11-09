import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseApiService } from 'src/app/shared/services/base-api.service';
import { IHeaderMenuItem } from 'src/app/shared/interfaces/header-menu-item.interface';
import { Responsive } from 'src/app/shared/responsive.decorator';
import { IResponsiveComponent } from 'src/app/shared/interfaces/responsive-component.interface';
import { HeaderService } from '../header.service';
import { Subject, Observable } from 'rxjs';
import { HeaderMenuResponseTypes } from 'src/app/shared/enums/header-menu-response-types.enum';
import { HeaderMenuItem } from 'src/app/shared/models/header-menu-item.model';

@Responsive()
@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements IResponsiveComponent, OnInit {
  isMobile: boolean;
  isSmall: boolean;
  isMenuExpanded: boolean = false;
  isMenuExpanded$: Subject<boolean> = this.headerService.showHeaderDialog$;
  headerMenuTypes = HeaderMenuResponseTypes;
  menuItems$: Observable<HeaderMenuItem[]> = this.apiService.getHeaderMenu();

  constructor(private apiService: BaseApiService,
              private headerService: HeaderService,
              private cdRef: ChangeDetectorRef) {
    this.isMenuExpanded$.subscribe( (status: boolean) => {
      this.isMenuExpanded = status;
      this.cdRef.markForCheck();
    });
  }

  ngOnInit() {
  }

  toggleMenu(): void {
    this.isMenuExpanded ? this.headerService.hideHeaderMenuDialog() : this.headerService.showHeaderMenuDialog();
  }
}
