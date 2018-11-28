import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef, ViewEncapsulation } from '@angular/core';
import { SwiperPaginationInterface, SwiperConfigInterface, SwiperNavigationInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { Responsive } from 'src/app/shared/decorators/responsive.decorator';
import { IResponsiveComponent } from 'src/app/shared/interfaces/responsive-component.interface';

@Responsive()
@Component({
  selector: 'app-menu-examples',
  templateUrl: './menu-examples.component.html',
  styleUrls: ['./menu-examples.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuExamplesComponent implements OnInit, IResponsiveComponent {
  @ViewChild(SwiperDirective) swiper: SwiperDirective;
  @ViewChild('swiperWrapper') swiperWrapper: ElementRef;

  animationDuration = 400;
  currentMenuIndex = 0;
  data = [
    {
      title: 'Классическое',
      imgUrl: 'https://storage.partiyaedi.ru/images/618a3aa5-cde3-4e6b-94aa-978c5cabc317_840x454.jpg'
    },
    {
      title: 'Премиум',
      imgUrl: 'https://storage.partiyaedi.ru/images/65560e5a-6ec5-4c06-88fb-d29a6932e72a_840x454.jpg'
    },
    {
      title: 'Семейное',
      imgUrl: 'https://storage.partiyaedi.ru/images/a5522d57-5503-4746-9ebf-3d960926f9bb_840x454.jpg'
    },
    {
      title: '10 минут',
      imgUrl: 'https://storage.partiyaedi.ru/images/618a3aa5-cde3-4e6b-94aa-978c5cabc317_840x454.jpg'
    },
    {
      title: 'Фитнес',
      imgUrl: 'https://storage.partiyaedi.ru/images/618a3aa5-cde3-4e6b-94aa-978c5cabc317_840x454.jpg'
    },
    {
      title: 'Вегетарианское',
      imgUrl: 'https://storage.partiyaedi.ru/images/618a3aa5-cde3-4e6b-94aa-978c5cabc317_840x454.jpg'
    },
  ];
  isMobile: boolean;
  isSmall: boolean;
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
              private elRef: ElementRef)  {
  }

  ngOnInit() {
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
        attributes: true,
        childList: true,
        characterData: true
      });
    }
  }

  get currentMenu() {
    return this.data[this.currentMenuIndex];
  }

  get swiperConfig(): SwiperConfigInterface {
    return this.isSmall ? this.swiperConfigMobile : this.swiperConfigDesktop;
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

  translateActiveTabLabelToCenter() {
    const inkElement: HTMLElement = this.elRef.nativeElement.querySelector('.mat-ink-bar');
    const target: HTMLElement = this.elRef.nativeElement.querySelector('.mat-tab-list');
    const windowHalfWindth = this.elRef.nativeElement.offsetWidth / 2;
    const inkIndent = 16;
    const inkPosition = parseInt(inkElement.style.left) - inkIndent;
    const labelHafWidth = parseInt(inkElement.style.width) / 2 + inkIndent;
    target.style.left = `${windowHalfWindth - inkPosition - labelHafWidth}px`;
  }

  addSliderAnimation() {
    (<HTMLElement>this.swiperWrapper.nativeElement).className += ' __animating';
  }

  removeSliderAnimation() {
    (<HTMLElement>this.swiperWrapper.nativeElement).className = 'menu-examples__slider-wrapper';
  }

  changeSlide(event: MouseEvent): void {
    (<any>event).path.some((path: HTMLElement) => {
      const className = path.className;
      if (className && className.includes('swiper-slide-next')) {
        this.swiper.nextSlide();
        return true;
      }
      else if (className.includes('swiper-slide-prev')) {
        this.swiper.prevSlide();
        return true;
      } else if (className.includes('swiper-slide-active')) {
        return true;
      }
    });
  }
}
