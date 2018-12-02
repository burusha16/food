import * as _ from 'lodash/core';
import {Subject, Observable} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import { Inject, Component, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HeaderMenuResponseTypes } from '../../../shared/enums/header-menu-response-types.enum';
import { HeaderMenuItem } from '../../../shared/models/header-menu-item.model';
import { BaseApiService } from '../../../shared/services/base-api.service';
import { AppComponent } from '../../../app.component';
import { WindowScrollService } from '../../../shared/services/window-scroll.service';
@Component({
  selector: 'app-header-menu-mobile-dialog',
  templateUrl: './mobile-dialog.component.html',
  styleUrls: ['./mobile-dialog.component.scss']
})
export class HeaderMenuDialogComponent implements AfterViewInit, OnDestroy {
  @ViewChild(AppComponent) App: AppComponent;
  menuHeaderItems$: Observable<HeaderMenuItem[]>;
  menuMobileItems$: Observable<HeaderMenuItem[]>;
  menuFooterItems$: Observable<HeaderMenuItem[]>;
  onDestroy$: Subject<void> = new Subject();

  constructor(private apiService: BaseApiService,
              private scrollService: WindowScrollService,
              private dialogRef: MatDialogRef<HeaderMenuDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: {showDialog$: Subject<boolean>}) {
    this.data.showDialog$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((status: boolean) => status ? null : this.dialogRef.close());
    this.menuHeaderItems$ = this.apiService.getHeaderMenu().pipe(
      map((items: HeaderMenuItem[]) =>
        _.filter(items, (item: HeaderMenuItem) => item.type === HeaderMenuResponseTypes.MobileHeader)
    ));
    this.menuMobileItems$ = this.apiService.getHeaderMenu().pipe(
      map((items: HeaderMenuItem[]) =>
        _.filter(items, (item: HeaderMenuItem) => item.type === HeaderMenuResponseTypes.MobileMenu)
    ));
    this.menuFooterItems$ = this.apiService.getHeaderMenu().pipe(
      map((items: HeaderMenuItem[]) =>
        _.filter(items, (item: HeaderMenuItem) => item.type === HeaderMenuResponseTypes.MobileFooter)
    ));
  }

  ngAfterViewInit() {
    this.scrollService.disableWindowScroll();
  }

  ngOnDestroy() {
    this.scrollService.enableWindowScroll();
    this.onDestroy$.next();
  }
}
