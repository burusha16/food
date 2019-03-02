import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderPromoComponent } from './header-promo/header-promo.component';
import { HeaderComponent } from './header.component';
import { SharedModule } from '@shared/modules/shared.module';
import { HeaderMenuComponent } from './header-menu/header-menu.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderPromoComponent,
    HeaderMenuComponent,
  ],
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    HeaderMenuComponent,
    HeaderPromoComponent
  ]
})
export class HeaderModule {
}
