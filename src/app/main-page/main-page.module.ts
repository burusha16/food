import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/modules/shared.module';
import { MainPageComponent } from './main-page.component';
import { ServicePresentationComponent } from './service-presentation/service-presentation.component';
import { OrderStepsComponent } from './order-steps/order-steps.component';

@NgModule({
  declarations: [
    MainPageComponent,
    ServicePresentationComponent,
    OrderStepsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class MainPageModule {
}
