import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { SafeUrlPipe } from '../pipes/safe-url.pipe';
import {DeliveryDatesPipe} from '@shared/pipes/delivery-dates.pipe';


@NgModule({
  declarations: [
    SafeHtmlPipe,
    SafeUrlPipe,
    DeliveryDatesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SafeHtmlPipe,
    SafeUrlPipe,
    DeliveryDatesPipe
  ]
})
export class PipesModule { }
