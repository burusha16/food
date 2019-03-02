import * as _ from 'lodash/core';
import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {IOrderFormConfig} from '@shared/interfaces/IOrderFormConfig.interface';
import {AppService} from '@shared/services/base-app.service';
import {IOffer} from '@shared/interfaces/offers.interface';
import {ProductType} from '@shared/enums/product-type.enum';
import {EProductClass} from '@shared/enums/product-class.enum';
import {Subject} from 'rxjs';
import {IProductDetailsData} from '@shared/interfaces/products-details-data.interface';
import {TitleCasePipe} from '@angular/common';
import {IAdditionalProductSelect} from './shared/additional-product-select.interface';
import {Product} from '@shared/models/product.model';

@Injectable({providedIn: 'root'})
export class MenuService {
  additionalMenuPassed$: Subject<boolean> = new Subject<boolean>();
  additionalMilkProducts: Product[];
  additionalProducts: Product[];
  defaultProducts: Product[];
  formConfig: IOrderFormConfig = this.appService.orderFormConfig;
  offers: IOffer[];
  orderForm: FormGroup;
  productIndex = 0;
  productDetailsData$: Subject<IProductDetailsData> = new Subject();

  constructor(private appService: AppService,
              private fb: FormBuilder) {
  }

  get product(): Product {
    return this.defaultProducts[this.productIndex];
  }

  get offer(): IOffer {
    return _.head(
      _.filter(this.offers, (offer: IOffer) => offer.weekKey === this.orderForm.get('dateKey').value)
    );
  }

  initOrderForm() {
    this.orderForm = this.fb.group({
      goodsCount: this.formConfig.defaultGoodsCount,
      dateKey: this.appService.actualWeekKey,
      class: this.formConfig.defaultClass,
      personAmount: this.formConfig.defaultPersonsAmount,
      defaultSet: new FormArray([]),
      additionalSet: new FormArray([]),
      additionalMilkSet: new FormArray([])
    });
  }

  getInitialIndex(routeClass: string): number {
    routeClass = new TitleCasePipe().transform(routeClass);
    let productIndex = 0;
    _.each(this.appService.menuTabsConfig.tabsSortRule, (classValue: string, index: number) => {
      if (classValue === routeClass) {
        productIndex = index;
      }
    });
    return productIndex;
  }

  setDefaultProducts() {
    const products: Product[] = _.filter(this.offer.products, (product: Product) => {
      const personsAmountValid = product.personsAmountView === this.orderForm.get('personAmount').value;
      const goodsCountValid = product.goodsCount === this.orderForm.get('goodsCount').value;
      const typeValid = product.type === ProductType.Box;
      return personsAmountValid && goodsCountValid && typeValid;
    });
    const sortedProducts: Product[] = _.map(this.appService.menuTabsConfig.tabsSortRule, (tabClass: string) => {
      return _.head(
        _.filter(products, (product: Product) => product.class === tabClass)
      );
    });
    this.defaultProducts = _.filter(sortedProducts, product => product);
    this.updateDefaultSetControl();
  }

  setAdditionalProducts(replaceProps?: IAdditionalProductSelect) {
    let additionalProducts = _.filter(this.offer.products, (product: Product) => {
      const goodsCountValid = !product.constructorAvailable || product.goodsCount === this.orderForm.get('goodsCount').value;
      const typeValid = product.type === ProductType.Additional;
      return typeValid && goodsCountValid;
    });
    if (replaceProps) {
      additionalProducts = _.map(additionalProducts, (product: Product) => {
        const goodForReplaceValid = product.class === replaceProps.class;
        if (goodForReplaceValid) {
          const productToReplace: Product = _.head(
            _.filter(this.offer.products, (prod: Product) => {
              return prod.class === replaceProps.class && prod.goodsCount === replaceProps.goodsCount;
            })
          );
          productToReplace.defaultGoods = replaceProps.selectedGoods;
          productToReplace.updateDefaultGoods();
          return productToReplace;
        }
        return product;
      });
    }
    this.additionalProducts = _.filter(additionalProducts,
      (product: Product) => product.class !== EProductClass.Cheese && product.class !== EProductClass.Milk);
    this.additionalMilkProducts = _.filter(additionalProducts,
      (product: Product) => product.class === EProductClass.Cheese || product.class === EProductClass.Milk);
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
