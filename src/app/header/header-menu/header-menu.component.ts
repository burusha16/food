import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {Responsive} from '@shared/decorators/responsive.decorator';
import {IResponsiveComponent} from '@shared/interfaces/responsive-component.interface';
import {IHeaderMenuItem} from '@shared/interfaces/app-menu.interface';
import {AppService} from '@shared/services/base-app.service';
import {MatDialog, MatDialogConfig} from '@angular/material';

@Responsive()
@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderMenuComponent implements IResponsiveComponent, OnInit {
  @ViewChild('dialog') dialogTemplate!: TemplateRef<any>;
  isMobile: boolean;
  isSmall: boolean;
  isDialogExpanded = false;
  menuItems: IHeaderMenuItem[] = this.appService.headerMenu;
  menuMobileItems: IHeaderMenuItem[] = this.appService.headerMenuMobBody;
  menuFooterItems: IHeaderMenuItem[] = this.appService.headerMenuMobFooter;

  constructor(private appService: AppService,
              private dialog: MatDialog,
              private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  showDialog() {
    const dialogConfig: MatDialogConfig = {
      panelClass: 'header-dialog__wrapper'
    };
    this.dialog.open(this.dialogTemplate, dialogConfig);
    this.isDialogExpanded = true;
    this.cdRef.markForCheck();
  }

  hideDialog() {
    this.dialog.closeAll();
    this.isDialogExpanded = false;
    this.cdRef.markForCheck();
  }

  toggleDialog() {
    this.isDialogExpanded ? this.hideDialog() : this.showDialog();
  }
}
