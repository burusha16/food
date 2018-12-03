import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/modules/shared.module';
import { MainPageComponent } from './main-page.component';
import { ServicePresentationComponent } from './service-presentation/service-presentation.component';
import { OrderStepsComponent } from './order-steps/order-steps.component';
import { SwiperSliderModule } from '../shared/modules/swiper-slider.module';
import { MenuExamplesComponent } from './menu-examples/menu-examples.component';
import {MainPageResolver} from './main-page.resolver';
import { MealInfoComponent } from './meal-info/meal-info.component';

@NgModule({
  declarations: [
    MainPageComponent,
    ServicePresentationComponent,
    OrderStepsComponent,
    MenuExamplesComponent,
    MealInfoComponent
  ],
  imports: [
    SharedModule,
    SwiperSliderModule
  ],
  providers: [
    MainPageResolver
  ]
})
export class MainPageModule {
}
