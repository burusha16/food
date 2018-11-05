import { Inject, Component } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Subject } from "rxjs";

export interface IHeaderMenuDialogData {
  animal: string;
  name: string;
  status$: Subject<boolean>;
}


@Component({
  selector: 'header-menu-mobile-dialog',
  templateUrl: './mobile-dialog.component.html',

})
export class HeaderMenuDialogComponent {
  constructor(public dialogRef: MatDialogRef<HeaderMenuDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IHeaderMenuDialogData) {
      this.data.status$.subscribe( status => {
        if( !status ) {
          this.dialogRef.close();
        }
      })
  }

  close() {
    this.data.status$.next(false);
  }
}