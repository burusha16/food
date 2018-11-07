import { Inject, Component, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Subject, Observable } from "rxjs";
import { HeaderMenuResponseTypes } from "src/app/shared/enums/header-menu-response-types.enum";
import { HeaderMenuItem } from "src/app/shared/models/header-menu-item.model";
import { BaseApiService } from "src/app/shared/services/base-api.service";

export interface IHeaderMenuDialogData {
  status$: Subject<boolean>;
}

@Component({
  selector: 'header-menu-mobile-dialog',
  templateUrl: './mobile-dialog.component.html',
  styleUrls: ['./mobile-dialog.component.scss']
})
export class HeaderMenuDialogComponent implements OnInit {
  mobileHeader = HeaderMenuResponseTypes.MobileHeader;
  mobileMenu = HeaderMenuResponseTypes.MobileMenu;
  mobileFooter = HeaderMenuResponseTypes.MobileFooter;
  menuItems$: Observable<HeaderMenuItem[]> = this.apiService.getHeaderMenu();

  constructor(private apiService: BaseApiService,
              private dialogRef: MatDialogRef<HeaderMenuDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: IHeaderMenuDialogData) {
    this.data.status$.subscribe( status => {
      if(!status) {
        this.dialogRef.close();
      }
    })
  }

  ngOnInit() {
  }

  close() {
    this.data.status$.next(false);
  }
}