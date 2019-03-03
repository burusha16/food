import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SafeHtmlPipe} from './safe-html.pipe';
import {SafeUrlPipe} from './safe-url.pipe';
import {DeliveryDatesPipe} from './delivery-dates.pipe';
import {PriceCurrencyPipe} from './price-currency.pipe';
import {DateFormatPipe} from './date-format.pipe';

const PIPES = [
  SafeHtmlPipe,
  SafeUrlPipe,
  DeliveryDatesPipe,
  PriceCurrencyPipe,
  DateFormatPipe
];

@NgModule({
  declarations: [
    ...PIPES
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...PIPES
  ]
})
export class PipesModule {
}
