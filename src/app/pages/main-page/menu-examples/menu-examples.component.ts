import * as _ from 'lodash/core';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SwiperConfigInterface, SwiperDirective, SwiperNavigationInterface, SwiperPaginationInterface} from 'ngx-swiper-wrapper';
import {IResponsiveComponent} from '@shared/interfaces/responsive-component.interface';
import {IProduct} from '@shared/interfaces/product.interface';
import {ContentPreloadService} from '@shared/services/content-preload.service';
import {IGood} from '@shared/interfaces/good.interface';
import {Responsive} from '@shared/decorators/responsive.decorator';
import {ServiceLocator} from '@shared/services/locator.service';
import {AppService} from '@shared/services/base-app.service';
import {ITabWithLink} from '@shared/interfaces/app-config.interface';
import {IOffer} from '@shared/interfaces/offers.interface';
import {MenuService} from '../../menu/menu.service';

@Responsive()
@Component({
  selector: 'app-menu-examples',
  templateUrl: './menu-examples.component.html',
  styleUrls: ['./menu-examples.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuExamplesComponent implements OnInit, AfterViewInit, IResponsiveComponent {
  @ViewChild(SwiperDirective) swiper: SwiperDirective;
  @ViewChild('swiperWrapper') swiperWrapper: ElementRef;

  animationDuration = 400;
  currentMenuIndex = 0;
  isMobile: boolean;
  isSmall: boolean;
  products: IProduct[] = [];
  tabWithLink: ITabWithLink = this.appService.menuTabsConfig.linkInTab;
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

  constructor(private cdRef: ChangeDetectorRef,
              private elRef: ElementRef,
              private route: ActivatedRoute,
              private router: Router,
              private contentPreloadService: ContentPreloadService,
              private appService: AppService,
              private menuService: MenuService)  {
    let products: IProduct[];
    const tabsConfig = this.appService.menuTabsConfig;
    _.each(this.menuService.offers, (offer: IOffer) => {
      if (offer.weekKey === this.appService.actualWeekKey) {
        products = _.filter(offer.products, ((product: IProduct) => {
          const personsAmountValid = product.personsAmount === tabsConfig.personsAmount;
          const defaultGoodsLengthValid = product.defaultGoodsModels.length === tabsConfig.defaultGoodsLength;
          const isProductFromList = tabsConfig.tabsSortRule.includes(product.class);

          return personsAmountValid && defaultGoodsLengthValid && isProductFromList;
        }));
      }
    });
    _.each(tabsConfig.tabsSortRule, (className: string) => {
      const sortedByOrderProduct = _.filter(products, (product: IProduct) => product.class === className)[0];
      this.products.push(sortedByOrderProduct);
    });
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
  }

  get currentProduct(): IProduct {
    return this.products[this.currentMenuIndex];
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

  onSelectMenuClick() {
    const className = this.currentProduct.class.toLowerCase();
    this.router.navigateByUrl(`menu/${className}`);
  }

  removeSliderAnimation() {
    (<HTMLElement>this.swiperWrapper.nativeElement).className = 'menu-examples__slider-wrapper';
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
