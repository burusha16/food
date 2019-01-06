import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@shared/modules/shared.module';
import {SharedComponentsModule} from '@shared/components/shared-components.module';
import {FooterModule} from '../../footer/footer.module';
import {HeaderModule} from '../../header/header.module';

import {MenuService} from './menu.service';
import {MenuResolver} from './menu.resolver';
import {MenuModuleRoutes} from './menu.routing';

import {MenuComponent} from './menu.component';
import {MenuHeaderComponent} from './menu-header/menu-header.component';
import {MenuDefaultSetComponent} from './menu-default-set/menu-default-set.component';
import {MenuDetailsComponent} from './menu-default-set/menu-details/menu-details.component';

@NgModule({
  declarations: [MenuComponent, MenuHeaderComponent, MenuDefaultSetComponent, MenuDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(MenuModuleRoutes),
    SharedModule,
    ReactiveFormsModule,
    HeaderModule,
    FooterModule,
    SharedComponentsModule
  ],
  providers: [MenuResolver, MenuService],
  exports: [RouterModule]
})
export class MenuModule {}
