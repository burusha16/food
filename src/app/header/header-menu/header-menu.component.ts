import { Subject, Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Responsive } from '../../shared/decorators/responsive.decorator';
import { BaseApiService } from '../../shared/services/base-api.service';
import { HeaderService } from '../header.service';
import { IResponsiveComponent } from '../../shared/interfaces/responsive-component.interface';
import {IHeaderMenuItem} from '../../shared/interfaces/app-menu.interface';

@Responsive()
@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements IResponsiveComponent, OnInit {
  isMobile: boolean;
  isSmall: boolean;
  isMenuExpanded = false;
  isMenuExpanded$: Subject<boolean> = this.headerService.showHeaderDialog$;
  menuItems$: Observable<IHeaderMenuItem[]> = this.apiService.headerDesktopMenu$;

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
