import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {MatDialog} from '@angular/material';
import {HeaderMenuDialogComponent} from './header-menu/mobile-dialog/mobile-dialog.component';

@Injectable()
export class HeaderService {
  showHeaderDialog$: Subject<boolean> = new Subject();

  constructor(public dialog: MatDialog) {
  }

  showHeaderMenuDialog() {
    this.dialog.open(HeaderMenuDialogComponent, {
      panelClass: 'header-menu__dialog',
      data: {showDialog$: this.showHeaderDialog$}
    });
    this.showHeaderDialog$.next(true);
  }

  hideHeaderMenuDialog() {
    this.showHeaderDialog$.next(false);
  }
}
