import * as _ from 'lodash/core';
import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {IProduct} from '@shared/interfaces/product.interface';
import {IOption} from '@shared/interfaces/option.interface';
import {AppService} from '@shared/services/base-app.service';
import {IOrderFormConfig} from '@shared/interfaces/IOrderFormConfig.interface';
import {PersonsAmount} from '@shared/enums/personsAmount.enum';
import {TranslateService} from '@ngx-translate/core';
import {MenuService} from '../../menu.service';


import { MatSelect } from '@angular/material';

import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuDetailsComponent {
  goodsCountsOptions: IOption[] = [];
  personsAmountOptions: IOption[] = [];
  formConfig: IOrderFormConfig = this.appService.orderFormConfig;

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
    // TODO: dirty hackZ
    MatSelect['decorators'][0].args[0].animations[0] = trigger('transformPanel', [
      state('void', style({
        transform: 'scaleY(0.8)',
        minWidth: '100%',
        opacity: 0
      })),
      state('showing', style({
        opacity: 1,
        minWidth: '100%',
        transform: 'scaleY(1)'
      })),
      state('showing-multiple', style({
        opacity: 1,
        minWidth: 'calc(100% + 48px)',
        transform: 'scaleY(1)'
      })),
      transition('void => *', animate('0ms cubic-bezier(0, 0, 0.2, 1)')),
      transition('* => void', animate('0ms 25ms linear', style({ opacity: 0 })))
    ]);
    console.log(MatSelect['decorators'][0].args[0].animations[0]);
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
    const sale = this.appService.paymentConfig.onlinePaySaleInPersents;
    const fraction = (100 - sale) / 100;
    return this.totalPrice * fraction;
  }
}
