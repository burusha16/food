import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/modules/shared.module';
import { MainPageComponent } from './main-page.component';
import { ServicePresentationComponent } from './service-presentation/service-presentation.component';
import { OrderStepsComponent } from './order-steps/order-steps.component';
import { SwiperSliderModule } from '@shared/modules/swiper-slider.module';
import { MenuExamplesComponent } from './menu-examples/menu-examples.component';
import { MealInfoComponent } from './meal-info/meal-info.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { VideoOfWeekComponent } from './video-of-week/video-of-week.component';
import { SmiListComponent } from './smi-list/smi-list.component';
import { MobileAppComponent } from './mobile-app/mobile-app.component';
import {RouterModule} from '@angular/router';
import {SharedComponentsModule} from '@shared/components/shared-components.module';
import {MainPageModuleRoutes} from './main-page.routing';
import {HeaderModule} from '../../header/header.module';
import {FooterModule} from '../../footer/footer.module';

@NgModule({
  declarations: [
    MainPageComponent,
    ServicePresentationComponent,
    OrderStepsComponent,
    MenuExamplesComponent,
    MealInfoComponent,
    FeedbackComponent,
    VideoOfWeekComponent,
    SmiListComponent,
    MobileAppComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(MainPageModuleRoutes),
    HeaderModule,
    FooterModule,
    SwiperSliderModule,
    SharedComponentsModule
  ],
  exports: [RouterModule]
})
export class MainPageModule {
}
