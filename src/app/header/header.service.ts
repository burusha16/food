import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { HeaderMenuDialogComponent } from './header-menu/mobile-dialog/mobile-dialog.component';

@Injectable()
export class HeaderService {

  headerMenuExpanded$: Subject<boolean> = new Subject();

  constructor(public dialog: MatDialog) {
  }

  showHeaderMenuDialog() {
    this.dialog.open(HeaderMenuDialogComponent, {
      panelClass: 'header-menu__dialog',
      data: {name: 'ilnur', animal: 'lion', status$: this.headerMenuExpanded$}
    });
    this.headerMenuExpanded$.next(true);
  }

  hideHeaderMenuDialog() {
    this.headerMenuExpanded$.next(false);
  }
}
