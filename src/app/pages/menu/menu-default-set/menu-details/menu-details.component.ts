import * as _ from 'lodash/core';
import {Component, OnInit} from '@angular/core';
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

@Responsive()
@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.scss']
})
export class MenuDetailsComponent implements OnInit, IResponsiveComponent {
  formConfig: IOrderFormConfig = this.appService.orderFormConfig;
  goodsCountsOptions: IOption[] = [];
  isMobile: boolean;
  isSmall: boolean;
  personsAmountOptions: IOption[] = [];
  onlinePaySale = this.appService.paymentConfig.onlinePaySaleInPersents;

  constructor(private appService: AppService,
              private menuService: MenuService,
              private translate: TranslateService) {
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

  get additionalMickProduct(): IProduct[] {
    return this.menuService.additionalMilkProducts;
  }

  get totalPrice(): number {
    const additionalGoodsPrice = _.map(
      this.orderForm.get('additionalSet').value,
      (value: boolean, index: number) => value ? this.additionalProducts[index].price : 0
    );
    const additionalMickGoodsPrice = _.map(
      this.orderForm.get('additionalMilkSet').value,
      (value: boolean, index: number) => value ? this.additionalMickProduct[index].price : 0
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
