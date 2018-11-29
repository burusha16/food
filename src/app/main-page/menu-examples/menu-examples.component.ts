import _ from 'lodash/core';
import * as moment from 'moment';
import {Component, ViewChild, ChangeDetectorRef, ElementRef, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {SwiperPaginationInterface, SwiperConfigInterface, SwiperNavigationInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import {Responsive} from 'src/app/shared/decorators/responsive.decorator';
import {IResponsiveComponent} from 'src/app/shared/interfaces/responsive-component.interface';
import {IOffer} from 'src/app/shared/interfaces/offers.interface';
import {BaseApiService} from 'src/app/shared/services/base-api.service';
import {AppService} from 'src/app/shared/services/base-app.service';
import {IProduct} from 'src/app/shared/interfaces/product.interface';
import {ISliderMenuExamplesConfig} from '../../shared/interfaces/app-config-response.interface';
import {ImagePreloadService} from '../../shared/services/image-preload.service';
import {IGood} from '../../shared/interfaces/good.interface';

@Responsive()
@Component({
  selector: 'app-menu-examples',
  templateUrl: './menu-examples.component.html',
  styleUrls: ['./menu-examples.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuExamplesComponent implements AfterViewInit, IResponsiveComponent {
  @ViewChild(SwiperDirective) swiper: SwiperDirective;
  @ViewChild('swiperWrapper') swiperWrapper: ElementRef;

  animationDuration = 400;
  currentMenuIndex = 0;
  isMobile: boolean;
  isSmall: boolean;
  products: IProduct[] = [];
  swiperPagination: SwiperPaginationInterface = {
    el: '.menu-examples__slider-pagination',
    bulletClass: 'menu-examples__slider-bullet',
    bulletActiveClass: 'menu-examples__slider-bullet-active',
    clickable: true
  };
  swiperNavifation: SwiperNavigationInterface = {
    prevEl: '.menu-examples__slider-nav-prev',
    nextEl: '.menu-examples__slider-nav-next',
    disabledClass: '__disabled'
  }
  swiperConfigDesktop: SwiperConfigInterface = {
    spaceBetween: 0,
    width: 1000,
    speed: this.animationDuration / 2,
    navigation: this.swiperNavifation
  };
  swiperConfigMobile: SwiperConfigInterface = {
    speed: this.animationDuration,
    pagination: this.swiperPagination,
    spaceBetween: 32
  };
  tabsMutationObserver: MutationObserver;

  constructor(private cdRef: ChangeDetectorRef,
              private elRef: ElementRef,
              private apiService: BaseApiService,
              private appService: AppService,
              private imagePreloadService: ImagePreloadService)  {
    this.apiService.getOffers()
      .subscribe((offers: IOffer[]) => {
        let products: IProduct[];
        offers.forEach((offer: IOffer) => {
          if (offer.weekKey === this.activeWeekKey) {
            products = _.filter(offer.products, ((product: IProduct) => {
              const personsAmountValid = product.personsAmount === this.componentConfig.personsAmount;
              const defaultGoodsLengthValid = product.defaultGoodsModels.length === this.componentConfig.defaultGoodsLength;
              const isProductFromList = this.componentConfig.tabsSortRule.includes(product.class);
              return personsAmountValid && defaultGoodsLengthValid && isProductFromList;
            }));
          }
        });
        _.each(this.appService.sliderMenuExamplesConfig.tabsSortRule, (className: string) => {
          const sortedByOrderProduct = _.filter(products, (product: IProduct) => product.class === className)[0];
          this.products.push(sortedByOrderProduct);
        })
        this.cdRef.markForCheck();
        _.each(this.products, (product: IProduct) => {
          _.each(product.defaultGoodsModels, (good: IGood) => {
            this.imagePreloadService.preload(good.images.rectangular.s840x454);
          });
        });
      });
  }

  ngAfterViewInit() {
    this.swiper.update();
    if (this.isMobile) {
      const element = this.elRef.nativeElement.querySelector('mat-ink-bar');
      this.tabsMutationObserver = new MutationObserver((mutations: MutationRecord[]) => {
            mutations.forEach((mutation: MutationRecord) => this.translateActiveTabLabelToCenter());
          }
      );
      this.tabsMutationObserver.observe(element, {
        attributes: true
      });
    }
  }

  get activeWeekKey(): string {
    return this.appService.actualWeekKey;
  }

  get componentConfig(): ISliderMenuExamplesConfig {
    return this.appService.sliderMenuExamplesConfig;
  }

  get currentProduct(): IProduct {
    return this.products ? this.products[this.currentMenuIndex] : undefined;
  }

  get deliveryDates(): string {
    const firstDate = this.currentProduct.availabilityDates[0];
    const secondDate = this.currentProduct.availabilityDates[1];
    const isSameMonth = moment(firstDate).format('MM') === moment(secondDate).format('MM');

    if (isSameMonth) {
      return `${moment(firstDate).format('D')}-${moment(secondDate).format('D MMMM')}`;
    } else {
      return `${moment(firstDate).format('D MMMM')} - ${moment(secondDate).format('D MMMM')}`;
    }
  }

  get swiperConfig(): SwiperConfigInterface {
    return this.isSmall ? this.swiperConfigMobile : this.swiperConfigDesktop;
  }

  addSliderAnimation() {
    (<HTMLElement>this.swiperWrapper.nativeElement).className += ' __animating';
  }

  changeSlide(event: MouseEvent) {
    (<any>event).path.some((path: HTMLElement) => {
      const className = path.className;
      if (className && className.includes('swiper-slide-next')) {
        this.swiper.nextSlide();
        return true;
      } else if (className.includes('swiper-slide-prev')) {
        this.swiper.prevSlide();
        return true;
      } else if (className.includes('swiper-slide-active')) {
        return true;
      }
    });
  }

  removeSliderAnimation() {
    (<HTMLElement>this.swiperWrapper.nativeElement).className = 'menu-examples__slider-wrapper';
  }

  translateActiveTabLabelToCenter() {
    const inkElement: HTMLElement = this.elRef.nativeElement.querySelector('.mat-ink-bar');
    const target: HTMLElement = this.elRef.nativeElement.querySelector('.mat-tab-list');
    const windowHalfWindth = this.elRef.nativeElement.offsetWidth / 2;
    const inkIndent = 16;
    const inkPosition = parseInt(inkElement.style.left, 10) - inkIndent;
    const labelHafWidth = parseInt(inkElement.style.width, 10) / 2 + inkIndent;
    target.style.left = `${windowHalfWindth - inkPosition - labelHafWidth}px`;
  }

  updateSliderData(index: number) {
    setTimeout(() => {
        this.currentMenuIndex = index;
        this.cdRef.markForCheck();
      },
      this.animationDuration / 2
    );
    this.addSliderAnimation();
    this.swiper.setIndex(0);
  }
}
