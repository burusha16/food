import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderPromoComponent } from './header-promo/header-promo.component';
import { RouterModule } from '@angular/router';
import { routes as Routes} from './header.routing';
import { HeaderComponent } from './header.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderPromoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(Routes),
    MaterialModule,
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {
}
