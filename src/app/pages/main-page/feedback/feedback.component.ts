import {concat, Observable, of} from 'rxjs';
import {AfterViewChecked, AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {SwiperConfigInterface, SwiperDirective, SwiperNavigationInterface, SwiperPaginationInterface} from 'ngx-swiper-wrapper';
import {BaseApiService} from '../../../shared/services/base-api.service';
import {IFeedback} from '../../../shared/interfaces/feedback.interface';
import {Responsive} from '../../../shared/decorators/responsive.decorator';
import {IResponsiveComponent} from '../../../shared/interfaces/responsive-component.interface';

@Responsive()
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FeedbackComponent implements AfterViewInit, AfterViewChecked, IResponsiveComponent {
  @ViewChild(SwiperDirective) swiper: SwiperDirective;
  activeSlideIndex$: Observable<number>;
  isMobile: boolean;
  isSmall: boolean;
  feedbacks$: Observable<IFeedback[]>;
  swiperNavigation: SwiperNavigationInterface = {
    prevEl: '.feedback__slider-nav-prev',
    nextEl: '.feedback__slider-nav-next',
    disabledClass: '__disabled'
  }
  swiperPagination: SwiperPaginationInterface = {
    el: '.feedback__slider-pagination',
    bulletClass: 'feedback__slider-bullet',
    bulletActiveClass: 'feedback__slider-bullet-active',
    clickable: true,
    hideOnClick: false,
  };
  swiperConfig: SwiperConfigInterface = {
    navigation: this.swiperNavigation,
    spaceBetween: 12,
    breakpoints: {
      600: {
        pagination: this.swiperPagination,
      }
    }
  };

  constructor(private apiService: BaseApiService,
              private elRef: ElementRef) {
    this.feedbacks$ = this.apiService.feedbacks$;
  }

  ngAfterViewInit() {
    const initialSlide = 0;
    this.activeSlideIndex$ = concat(of(initialSlide), this.swiper.indexChange.asObservable());
  }

  ngAfterViewChecked() {
    if (this.isSmall) {
      this.setPaginatorToCenter();
    }
  }

  setPaginatorToCenter() {
    const activeItem: HTMLElement = this.elRef.nativeElement.querySelector('.__active');

    if (activeItem) {
      const wrapper: HTMLElement = this.elRef.nativeElement.querySelector('.feedback__pagination');
      const deviceWidth: number = wrapper.offsetWidth;
      const translateValue: number = (deviceWidth - activeItem.offsetWidth) / 2 - activeItem.offsetLeft;
      wrapper.style.transform = `translateX(${translateValue}px)`;
    }
  }

  navigateToSlide(index: number) {
    this.swiper.setIndex(index);
  }
}
