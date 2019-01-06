import { Component, ViewEncapsulation, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { SwiperConfigInterface, SwiperPaginationInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeviceWindowService } from '../../../shared/services/device-window.service';

interface IOrderStepSlide {
  descriptionKey: string;
  showImg: boolean;
}

@Component({
  selector: 'app-order-steps',
  templateUrl: './order-steps.component.html',
  styleUrls: ['./order-steps.component.scss'],
  encapsulation : ViewEncapsulation.None,
})
export class OrderStepsComponent implements AfterViewInit, OnDestroy {
  @ViewChild(SwiperDirective) swiper: SwiperDirective;

  onDestroy$: Subject<void> = new Subject();
  slides: IOrderStepSlide[] = [];
  swiperPagination: SwiperPaginationInterface = {
    el: '.order-steps__slider-pagination',
    bulletClass: 'order-steps__slider-bullet',
    bulletActiveClass: 'order-steps__slider-bullet-active',
    clickable: true,
    hideOnClick: false,
  };
  swiperConfig: SwiperConfigInterface = {
    slidesPerView: 3,
    initialSlide: 1,
    noSwiping: true,
    threshold: 4000,
    spaceBetween: 0,
    breakpoints: {
      600: {
        pagination: this.swiperPagination,
        slidesPerView: 1,
        initialSlide: 0,
        threshold: 0,
      }
    }
  };

  constructor(private deviceService: DeviceWindowService) {
    for (let index = 0; index < 3; index++) {
      const slide: IOrderStepSlide = {
        descriptionKey: `main-page.order-steps.step${index + 1}`,
        showImg: !index
      }
      this.slides.push(slide);
    }
  }

  ngAfterViewInit() {
    this.deviceService.onResize$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.swiper.update();
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
