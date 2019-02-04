import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Responsive } from '@shared/decorators/responsive.decorator';
import { HeaderService } from '../header.service';
import { IResponsiveComponent } from '@shared/interfaces/responsive-component.interface';
import {IHeaderMenuItem} from '@shared/interfaces/app-menu.interface';
import {AppService} from '@shared/services/base-app.service';

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
  menuItems: IHeaderMenuItem[] = this.appService.headerMenu;

  constructor(private appService: AppService,
              private headerService: HeaderService) {
    this.isMenuExpanded$.subscribe( (status: boolean) => {
      this.isMenuExpanded = status;
    });
  }

  ngOnInit() {
  }

  toggleMenu(): void {
    this.isMenuExpanded ? this.headerService.hideHeaderMenuDialog() : this.headerService.showHeaderMenuDialog();
  }
}
