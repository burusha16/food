import {Subject, Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { Inject, Component, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BaseApiService } from '../../../shared/services/base-api.service';
import { AppComponent } from '../../../app.component';
import { WindowScrollService } from '../../../shared/services/window-scroll.service';
import {IHeaderMenuItem} from '../../../shared/interfaces/app-menu.interface';
@Component({
  selector: 'app-header-menu-mobile-dialog',
  templateUrl: './mobile-dialog.component.html',
  styleUrls: ['./mobile-dialog.component.scss']
})
export class HeaderMenuDialogComponent implements AfterViewInit, OnDestroy {
  @ViewChild(AppComponent) App: AppComponent;
  menuMobileItems$: Observable<IHeaderMenuItem[]> = this.apiService.headerMobileBody$;
  menuFooterItems$: Observable<IHeaderMenuItem[]> = this.apiService.headerMobileFooter$;
  onDestroy$: Subject<void> = new Subject();

  constructor(private apiService: BaseApiService,
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
  }
}
