import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { Inject, Component, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AppComponent } from '../../../app.component';
import { WindowScrollService } from '../../../shared/services/window-scroll.service';
import {IHeaderMenuItem} from '../../../shared/interfaces/app-menu.interface';
import {AppService} from '@shared/services/base-app.service';
@Component({
  selector: 'app-header-menu-mobile-dialog',
  templateUrl: './mobile-dialog.component.html',
  styleUrls: ['./mobile-dialog.component.scss']
})
export class HeaderMenuDialogComponent implements AfterViewInit, OnDestroy {
  @ViewChild(AppComponent) App: AppComponent;
  menuMobileItems: IHeaderMenuItem[] = this.appService.headerMenuMobBody;
  menuFooterItems: IHeaderMenuItem[] = this.appService.headerMenuMobFooter;
  onDestroy$: Subject<void> = new Subject();

  constructor(private appService: AppService,
              private scrollService: WindowScrollService,
              private dialogRef: MatDialogRef<HeaderMenuDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: {showDialog$: Subject<boolean>}) {
    this.data.showDialog$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((status: boolean) => status ? null : this.dialogRef.close());
  }

  ngAfterViewInit() {
    this.scrollService.disableWindowScroll();
  }

  ngOnDestroy() {
    this.scrollService.enableWindowScroll();
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  hide() {
    this.dialogRef.close();
  }
}
