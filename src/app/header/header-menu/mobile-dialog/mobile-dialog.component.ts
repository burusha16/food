import { Inject, Component, OnInit, OnDestroy } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Subject, Observable } from "rxjs";
import { HeaderMenuResponseTypes } from "src/app/shared/enums/header-menu-response-types.enum";
import { HeaderMenuItem } from "src/app/shared/models/header-menu-item.model";
import { BaseApiService } from "src/app/shared/services/base-api.service";
import { takeUntil } from "rxjs/operators";
@Component({
  selector: 'header-menu-mobile-dialog',
  templateUrl: './mobile-dialog.component.html',
  styleUrls: ['./mobile-dialog.component.scss']
})
export class HeaderMenuDialogComponent implements OnDestroy {
  mobileHeader = HeaderMenuResponseTypes.MobileHeader;
  mobileMenu = HeaderMenuResponseTypes.MobileMenu;
  mobileFooter = HeaderMenuResponseTypes.MobileFooter;
  menuItems$: Observable<HeaderMenuItem[]> = this.apiService.getHeaderMenu();
  onDestroy$: Subject<void> = new Subject();

  constructor(private apiService: BaseApiService,
              private dialogRef: MatDialogRef<HeaderMenuDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: {showDialog$: Subject<boolean>}) {
    this.data.showDialog$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((status: boolean) => status ? null : this.dialogRef.close());
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  close() {
    this.data.showDialog$.next(false);
  }
}