import * as _ from 'lodash/core';
import { Injectable } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {IProduct} from '@shared/interfaces/product.interface';
import {IOrderFormConfig} from '@shared/interfaces/IOrderFormConfig.interface';
import {AppService} from '@shared/services/base-app.service';
import {IOffer} from '@shared/interfaces/offers.interface';
import {ProductType} from '@shared/enums/productType.enum';
import {productClass} from '@shared/enums/productClass.enum';

@Injectable()
export class MenuService {
  additionalProducts: IProduct[];
  additionalMilkProducts: IProduct[];
  formConfig: IOrderFormConfig = this.appService.orderFormConfig;
  offers: IOffer[];
  orderForm: FormGroup;
  products: IProduct[];
  productIndex = 0;

  constructor(private appService: AppService,
              private fb: FormBuilder) {
  }

  get product(): IProduct {
    return this.products[this.productIndex];
  }

  initOrderForm() {
    this.orderForm = this.fb.group({
      goodsCount: this.formConfig.defaultGoodsCount,
      dateKey: this.appService.actualWeekKey,
      class: this.formConfig.defaultClass,
      personAmount: this.formConfig.defaultPersonsAmount,
      defaultSet: null,
      additionalSet: null,
      additionalMilkSet: null
    });
  }

  updateProducts() {
    const currentOffer: IOffer = _.head(
      _.filter(this.offers, (offer: IOffer) => offer.weekKey === this.orderForm.get('dateKey').value)
    );
    const products: IProduct[] = _.filter(currentOffer.products, (product: IProduct) => {
      const personsAmountValid = product.personsAmountView === this.orderForm.get('personAmount').value;
      const goodsCountValid = product.goodsCount === this.orderForm.get('goodsCount').value;
      const typeValid = product.type === ProductType.Box;
      return personsAmountValid && goodsCountValid && typeValid;
    });
    const sortedProducts: IProduct[] = _.map(this.appService.menuTabsConfig.tabsSortRule, (tabClass: string) => {
      return _.head(
        _.filter(products, (product: IProduct) => product.class === tabClass)
      );
    });
    this.products = _.filter(sortedProducts, product => product);
    this.updateDefaultSetControl();
  }

  updateAdditionalProducts() {
    const currentOffer: IOffer = _.head(
      _.filter(this.offers, (offer: IOffer) => offer.weekKey === this.orderForm.get('dateKey').value)
    );
    const additionalProducts = _.filter(currentOffer.products, (product: IProduct) => {
      const personsAmountValid = product.personsAmountView === this.orderForm.get('personAmount').value;
      const goodsCountValid = !product.constructorAvailable || product.goodsCount === this.orderForm.get('goodsCount').value;
      const typeValid = product.type === ProductType.Additional;
      return personsAmountValid && typeValid && goodsCountValid;
    });
    this.additionalProducts = _.filter(additionalProducts,
      (product: IProduct) => product.class !== productClass.Cheese && product.class !== productClass.Milk);
    this.additionalMilkProducts = _.filter(additionalProducts,
      (product: IProduct) => product.class === productClass.Cheese || product.class === productClass.Milk);
    this.updateAdditionalSetsControls();
  }

  updateDefaultSetControl() {
    const defaultSetControls = this.product.availableGoods
      .map((good: string) => new FormControl(this.product.defaultGoods.includes(good)));
    this.orderForm.setControl('defaultSet', new FormArray(defaultSetControls));
  }

  updateAdditionalSetsControls() {
    const addtitonalSetControls = this.additionalProducts.map(() => new FormControl(false));
    const addtitonalMilkSetControls = this.additionalMilkProducts.map(() => new FormControl(false));
    this.orderForm.setControl('additionalSet', new FormArray(addtitonalSetControls));
    this.orderForm.setControl('additionalMilkSet', new FormArray(addtitonalMilkSetControls));
  }
}
