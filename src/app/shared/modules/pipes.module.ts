import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SafeHtmlPipe} from '@shared/pipes/safe-html.pipe';
import {SafeUrlPipe} from '@shared/pipes/safe-url.pipe';
import {DeliveryDatesPipe} from '@shared/pipes/delivery-dates.pipe';
import {PriceCurrencyPipe} from '@shared/pipes/price-currency.pipe';


@NgModule({
  declarations: [
    SafeHtmlPipe,
    SafeUrlPipe,
    DeliveryDatesPipe,
    PriceCurrencyPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SafeHtmlPipe,
    SafeUrlPipe,
    DeliveryDatesPipe,
    PriceCurrencyPipe
  ]
})
export class PipesModule {
}
