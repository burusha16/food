import { NgModule } from '@angular/core';
import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface, SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 1,
  centeredSlides: true
};
 
@NgModule({
  imports: [
    SwiperModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  exports: [
    SwiperComponent,
    SwiperDirective
  ]
})
export class SwiperSliderModule {
}
