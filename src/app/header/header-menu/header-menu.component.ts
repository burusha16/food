import * as _ from 'lodash/core';
import { Subject, Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Responsive } from '../../shared/decorators/responsive.decorator';
import { BaseApiService } from '../../shared/services/base-api.service';
import { HeaderMenuItem } from '../../shared/models/header-menu-item.model';
import { HeaderService } from '../header.service';
import { IResponsiveComponent } from '../../shared/interfaces/responsive-component.interface';
import { HeaderMenuResponseTypes } from '../../shared/enums/header-menu-response-types.enum';
import {map} from 'rxjs/operators';

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
  headerMenuTypes = HeaderMenuResponseTypes;
  menuItems$: Observable<HeaderMenuItem[]>;

  constructor(private apiService: BaseApiService,
              private headerService: HeaderService,
              private cdRef: ChangeDetectorRef) {
    this.isMenuExpanded$.subscribe( (status: boolean) => {
      this.isMenuExpanded = status;
      this.cdRef.markForCheck();
    });
    this.menuItems$ = this.apiService.getHeaderMenu().pipe(
      map((items: HeaderMenuItem[]) =>
        _.filter(items, (item: HeaderMenuItem) => item.type === HeaderMenuResponseTypes.Desktop)
      ));
  }

  ngOnInit() {
  }

  toggleMenu(): void {
    this.isMenuExpanded ? this.headerService.hideHeaderMenuDialog() : this.headerService.showHeaderMenuDialog();
  }
}
