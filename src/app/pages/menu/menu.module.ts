import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/modules/shared.module';

import {MenuResolver} from './menu.resolver';
import {MenuModuleRoutes} from './menu.routing';

import {MenuComponent} from './menu.component';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(MenuModuleRoutes),
    SharedModule
  ],
  providers: [MenuResolver],
  exports: [RouterModule]
})
export class MenuModule {}
