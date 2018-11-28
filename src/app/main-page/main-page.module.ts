import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/modules/shared.module';
import { MainPageComponent } from './main-page.component';
import { ServicePresentationComponent } from './service-presentation/service-presentation.component';
import { OrderStepsComponent } from './order-steps/order-steps.component';
import { SwiperSliderModule } from '../shared/modules/swiper-slider.module';
import { MenuExamplesComponent } from './menu-examples/menu-examples.component';

@NgModule({
  declarations: [
    MainPageComponent,
    ServicePresentationComponent,
    OrderStepsComponent,
    MenuExamplesComponent
  ],
  imports: [
    SharedModule,
    SwiperSliderModule
  ],
})
export class MainPageModule {
}
