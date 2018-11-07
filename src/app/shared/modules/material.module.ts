import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatCommonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatLineModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatPseudoCheckboxModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTabsModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatIconRegistry,
  MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MaterialIconsList } from '../other/material-icons-list';
import { IMatIcon } from '../interfaces/mat-icon.interface';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    // MatAutocompleteModule,
    // MatBadgeModule,
    // MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    // MatCardModule,
    MatCheckboxModule,
    // MatChipsModule,
    MatCommonModule,
    // MatDatepickerModule,
    MatDialogModule,
    // MatDividerModule,
    // MatExpansionModule,
    MatFormFieldModule,
    // MatGridListModule,
    MatIconModule,
    MatInputModule,
    // MatLineModule,
    // MatListModule,
    // MatMenuModule,
    // MatNativeDateModule,
    // MatOptionModule,
    // MatPaginatorModule,
    // MatProgressBarModule,
    // MatProgressSpinnerModule,
    // MatPseudoCheckboxModule,
    MatRadioModule,
    // MatRippleModule,
    // MatSelectModule,
    // MatSidenavModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    // MatSnackBarModule,
    // MatSortModule,
    // MatStepperModule,
    // MatTabsModule,
    // MatTableModule,
    // MatToolbarModule,
    MatTooltipModule,
    // MatTreeModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class MaterialModule {
  constructor(sanitizer: DomSanitizer,
              matIconRegistry: MatIconRegistry) {
    const extention = '.svg';
    MaterialIconsList.forEach((icon: IMatIcon) => {
      const url = sanitizer.bypassSecurityTrustResourceUrl(icon.src + icon.name + extention);
      matIconRegistry.addSvgIcon(icon.name, url);
    });
  }
}
