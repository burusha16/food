import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderPromoComponent } from './header-promo/header-promo.component';
import { RouterModule } from '@angular/router';
import { routes as Routes} from './header.routing';
import { HeaderComponent } from './header.component';
import { SharedModule } from '../shared/modules/shared.module';
import { HeaderMenuComponent } from './header-menu/header-menu.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderPromoComponent,
    HeaderMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(Routes),
    SharedModule
  ],
  exports: [
    HeaderComponent,
    HeaderMenuComponent
  ]
})
export class HeaderModule {
}
