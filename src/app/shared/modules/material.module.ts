import {Inject, NgModule, PLATFORM_ID} from '@angular/core';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatCommonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatTabsModule,
  MatTooltipModule,
  MatIconRegistry,
  MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MaterialIconsList } from '../other/material-icons-list';
import { IMatIcon } from '../interfaces/mat-icon.interface';
import { HttpClientModule } from '@angular/common/http';
import {isPlatformServer} from '@angular/common';

@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatCommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatTabsModule,
    MatTooltipModule,
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class MaterialModule {
  constructor(sanitizer: DomSanitizer,
              matIconRegistry: MatIconRegistry,
              @Inject(PLATFORM_ID) platformId: string) {
    const extention = '.svg';
    const domain = isPlatformServer(platformId) ? `http://burusha-angular.herokuapp.com` : '';
    MaterialIconsList.forEach((icon: IMatIcon) => {
      const url = sanitizer.bypassSecurityTrustResourceUrl(domain + icon.src + icon.name + extention);
      matIconRegistry.addSvgIcon(icon.name, url);
    });
  }
}
