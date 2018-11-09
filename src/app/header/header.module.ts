import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderService } from './header.service';
import { RouterModule } from '@angular/router';
import { routes as Routes} from './header.routing';
import { HeaderPromoComponent } from './header-promo/header-promo.component';
import { HeaderComponent } from './header.component';
import { SharedModule } from '../shared/modules/shared.module';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { HeaderMenuDialogComponent } from './header-menu/mobile-dialog/mobile-dialog.component'
import { WindowScrollService } from '../shared/services/window-scroll.service';
@NgModule({
  declarations: [
    HeaderComponent,
    HeaderPromoComponent,
    HeaderMenuComponent,
    HeaderMenuDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(Routes),
    SharedModule
  ],
  exports: [
    HeaderComponent,
    HeaderMenuComponent
  ],
  providers: [
    HeaderService,
    WindowScrollService
  ],
  entryComponents: [ HeaderMenuDialogComponent ]
})
export class HeaderModule {
}
