import {Inject, NgModule, PLATFORM_ID} from '@angular/core';
import {
  MatCommonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatTabsModule,
  MatIconRegistry,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatOptionModule,
  MatSelectModule,
  MatTooltipModule,
  MatSidenavModule,
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
    MatCommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatTabsModule,
    MatOptionModule,
    MatSelectModule,
    MatTooltipModule,
    MatSidenavModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
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
