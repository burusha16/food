import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@shared/modules/shared.module';
import {SharedComponentsModule} from '@shared/components/shared-components.module';
import {FooterModule} from '../../footer/footer.module';
import {HeaderModule} from '../../header/header.module';

import {MenuModuleRoutes} from './menu.routing';

import {MenuComponent} from './menu.component';
import {MenuHeaderComponent} from './menu-header/menu-header.component';
import {MenuDefaultSetComponent} from './menu-default-set/menu-default-set.component';
import {MenuDetailsComponent} from './menu-details/menu-details.component';
import { MenuAdditionalSetComponent } from './menu-additional-set/menu-additional-set.component';
import { ProductDetailsListComponent } from './product-details-list/product-details-list.component';
import { MenuConstructorComponent } from './menu-constructor/menu-constructor.component';
import {MenuSidenavService} from './menu-sidenav.service';
import { ProductDetailsSliderComponent } from './menu-constructor/product-details-slider/product-details-slider.component';
import { AdditionalProductComponent } from './menu-additional-set/additional-product/additional-product.component';

@NgModule({
  declarations: [
    MenuComponent,
    MenuHeaderComponent,
    MenuDefaultSetComponent,
    MenuDetailsComponent,
    MenuAdditionalSetComponent,
    ProductDetailsListComponent,
    MenuConstructorComponent,
    ProductDetailsSliderComponent,
    AdditionalProductComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MenuModuleRoutes),
    SharedModule,
    ReactiveFormsModule,
    HeaderModule,
    FooterModule,
    SharedComponentsModule
  ],
  exports: [RouterModule],
  providers: [MenuSidenavService]
})
export class MenuModule {}
