import * as _ from 'lodash/core';
import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

import {AppService} from '@shared/services/base-app.service';
import {MenuService} from '../../menu.service';
import {Responsive} from '@shared/decorators/responsive.decorator';
import {PersonsAmount} from '@shared/enums/personsAmount.enum';
import {IProduct} from '@shared/interfaces/product.interface';
import {IOption} from '@shared/interfaces/option.interface';
import {IOrderFormConfig} from '@shared/interfaces/IOrderFormConfig.interface';
import {IResponsiveComponent} from '@shared/interfaces/responsive-component.interface';
import {PriceCurrencyPipe} from '@shared/pipes/price-currency.pipe';
import {WindowScrollService} from '@shared/services/window-scroll.service';
import {Subject} from 'rxjs';
import {DeviceWindowService} from '@shared/services/device-window.service';
import {delay, takeUntil} from 'rxjs/operators';

@Responsive()
@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuDetailsComponent implements OnInit, AfterViewInit, OnDestroy, IResponsiveComponent {
  additionalMenuPassed$: Subject<boolean> = this.menuService.additionalMenuPassed$;
  detailsIsFixed$: Subject<boolean> = new Subject<boolean>();
  formConfig: IOrderFormConfig = this.appService.orderFormConfig;
  goodsCountsOptions: IOption[] = [];
  isMobile: boolean;
  isSmall: boolean;
  personsAmountOptions: IOption[] = [];
  onlinePaySale = this.appService.paymentConfig.onlinePaySaleInPersents;
  onDestroy$: Subject<void> = new Subject<void>();
  styles: any;

  constructor(private appService: AppService,
              private menuService: MenuService,
              private translate: TranslateService,
              private elRef: ElementRef,
              private scrollService: WindowScrollService,
              private deviceService: DeviceWindowService,
              private cdRef: ChangeDetectorRef) {
    _.each(this.formConfig.avaibleGoodsCounts, (value: number) => {
      this.goodsCountsOptions.push({
        value: value,
        viewValue: this.translate.instant(`menu.details.${value}dinners`)
      });
    });
    _.each(this.formConfig.aviablePersonsAmounts, (value: PersonsAmount) => {
      this.personsAmountOptions.push({
        value: value,
        viewValue: this.translate.instant(`menu.details.${value}`)
      });
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.deviceService.onResize$
      .pipe(
        delay(this.scrollService.delayTime),
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => {
        const scrollBreakpoint = this.elRef.nativeElement.offsetTop - this.headerHeight;
        this.scrollService.addScrollListener(scrollBreakpoint, this.constructor.name, this.detailsIsFixed$);
      });
    this.detailsIsFixed$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((breakpointPassed: boolean) => {
        if (breakpointPassed) {
          this.styles = {
            position: 'fixed',
            top: `${this.headerHeight}px`,
            borderBottom: '1px solid #ecebeb',
          };
        } else {
          this.styles = {};
        }
        this.cdRef.markForCheck();
      });
    this.additionalMenuPassed$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((breakpointPassed: boolean) => {
        const defaultSetColor = '#f9f9f9';
        const additionalSetColor = '#fff9f0';
        this.styles.backgroundColor = breakpointPassed ? additionalSetColor : defaultSetColor;
        this.cdRef.markForCheck();
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  get headerHeight(): number {
    const headerListenerName = 'HeaderComponent';
    return this.scrollService.listeners.has(headerListenerName)
      ? this.scrollService.listeners.get(headerListenerName).breakpoint
      : 0;
  }

  get priceTooltipTranslateProps(): any {
    return {sale: this.onlinePaySale, price: new PriceCurrencyPipe().transform(this.totalPrice, '0.0', true, 'rub')};
  }

  get orderForm(): FormGroup {
    return this.menuService.orderForm;
  }

  get defaultProduct(): IProduct {
    return this.menuService.product;
  }

  get additionalProducts(): IProduct[] {
    return this.menuService.additionalProducts;
  }

  get additionalMilkProduct(): IProduct[] {
    return this.menuService.additionalMilkProducts;
  }

  get totalPrice(): number {
    const additionalGoodsPrice = _.map(
      this.orderForm.get('additionalSet').value,
      (value: boolean, index: number) => value ? this.additionalProducts[index].price : 0
    );
    const additionalMickGoodsPrice = _.map(
      this.orderForm.get('additionalMilkSet').value,
      (value: boolean, index: number) => value ? this.additionalMilkProduct[index].price : 0
    );
    const defaultGoodsPrice = this.defaultProduct.price;
    const summ = [defaultGoodsPrice, ...additionalGoodsPrice, ...additionalMickGoodsPrice].reduce((prev, next) => prev + next);
    return summ;
  }

  get totalPriceWithSale(): number {
    const sale = this.onlinePaySale;
    const fraction = (100 - sale) / 100;
    return this.totalPrice * fraction;
  }
}
