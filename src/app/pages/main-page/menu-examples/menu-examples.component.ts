import * as _ from 'lodash/core';
import * as moment from 'moment';
import {
  Component,
  ViewChild,
  ChangeDetectorRef,
  ElementRef,
  ViewEncapsulation,
  AfterViewInit,
  OnInit
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SwiperPaginationInterface, SwiperConfigInterface, SwiperNavigationInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import {IResponsiveComponent} from '@shared/interfaces/responsive-component.interface';
import {IProduct} from '@shared/interfaces/product.interface';
import {ContentPreloadService} from '@shared/services/content-preload.service';
import {IGood} from '@shared/interfaces/good.interface';
import {Responsive} from '@shared/decorators/responsive.decorator';
import {ServiceLocator} from '@shared/services/locator.service';

@Responsive()
@Component({
  selector: 'app-menu-examples',
  templateUrl: './menu-examples.component.html',
  styleUrls: ['./menu-examples.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuExamplesComponent implements OnInit, AfterViewInit, IResponsiveComponent {
  @ViewChild(SwiperDirective) swiper: SwiperDirective;
  @ViewChild('swiperWrapper') swiperWrapper: ElementRef;

  animationDuration = 400;
  currentMenuIndex = 0;
  isMobile: boolean;
  isSmall: boolean;
  products: IProduct[];
  swiperPagination: SwiperPaginationInterface = {
    el: '.menu-examples__slider-pagination',
    bulletClass: 'menu-examples__slider-bullet',
    bulletActiveClass: 'menu-examples__slider-bullet-active',
    clickable: true
  };
  swiperNavigation: SwiperNavigationInterface = {
    prevEl: '.menu-examples__slider-nav-prev',
    nextEl: '.menu-examples__slider-nav-next',
    disabledClass: '__disabled'
  }
  swiperConfigDesktop: SwiperConfigInterface = {
    spaceBetween: 0,
    width: 1000,
    speed: this.animationDuration / 2,
    navigation: this.swiperNavigation
  };
  swiperConfigMobile: SwiperConfigInterface = {
    speed: this.animationDuration,
    pagination: this.swiperPagination,
    spaceBetween: 32
  };
  tabsMutationObserver: MutationObserver;

  constructor(private cdRef: ChangeDetectorRef,
              private elRef: ElementRef,
              private route: ActivatedRoute,
              private contentPreloadService: ContentPreloadService)  {
    this.products = this.route.snapshot.data.menuExamples;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    if (ServiceLocator.isBrowser) {
      _.each(this.products, (product: IProduct) => {
        _.each(product.defaultGoodsModels, (good: IGood) => {
          this.contentPreloadService.preload(good.images.rectangular.s840x454);
        });
      });
    }
    this.swiper.update();
    if (this.isMobile) {
      const element = this.elRef.nativeElement.querySelector('mat-ink-bar');
      this.tabsMutationObserver = new MutationObserver((mutations: MutationRecord[]) => {
            mutations.forEach(() => this.translateActiveTabLabelToCenter());
          }
      );
      this.tabsMutationObserver.observe(element, {
        attributes: true
      });
    }
  }

  get currentProduct(): IProduct {
    return this.products[this.currentMenuIndex];
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
        this.swiper.setIndex(0, 0, true);
        this.cdRef.markForCheck();
      },
      this.animationDuration / 2
    );
    this.addSliderAnimation();
  }
}
