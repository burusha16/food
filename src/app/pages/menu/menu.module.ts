import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/modules/shared.module';

import {MenuResolver} from './menu.resolver';
import {MenuModuleRoutes} from './menu.routing';

import {MenuComponent} from './menu.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HeaderModule} from '../../header/header.module';
import {FooterModule} from '../../footer/footer.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(MenuModuleRoutes),
    SharedModule,
    ReactiveFormsModule,
    HeaderModule,
    FooterModule
  ],
  providers: [MenuResolver],
  exports: [RouterModule]
})
export class MenuModule {}
