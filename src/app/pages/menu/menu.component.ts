import * as _ from 'lodash/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TitleCasePipe} from '@angular/common';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AppService} from '@shared/services/base-app.service';
import {IOrderFormConfig} from '@shared/interfaces/IOrderFormConfig.interface';
import {IProduct} from '@shared/interfaces/product.interface';
import {IOffer} from '@shared/interfaces/offers.interface';
import {productClass} from '@shared/enums/productClass.enum';
import {ProductType} from '@shared/enums/productType.enum';
import {ITabWithLink} from '@shared/interfaces/app-config.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnDestroy {
  additionalProducts: IProduct[];
  additionalMilkProducts: IProduct[];
  formConfig: IOrderFormConfig = this.appService.orderFormConfig;
  productUpdateFactors: string[] = ['goodsCount', 'dateKey', 'class', 'personAmount'];
  orderForm: FormGroup;
  productIndex = 0;
  products: IProduct;
  offers: IOffer[];
  onDestroy$: Subject<void> = new Subject();
  tabWithLink: ITabWithLink = this.appService.menuTabsConfig.linkInTab;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private cdRef: ChangeDetectorRef,
              private appService: AppService) {
    this.offers = this.route.snapshot.data.offers;
    this.formConfig.defaultClass = new TitleCasePipe().transform(this.route.snapshot.params.class);
    this.initOrderForm();
    this.updateAdditionalProducts();
    this.updateProducts();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
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
    _.each(this.productUpdateFactors, (key: string) => {
      this.orderForm.get(key).valueChanges
        .pipe(takeUntil(this.onDestroy$))
        .subscribe( () => this.updateProducts());
    });
    this.orderForm.get('dateKey').valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe( () => this.updateAdditionalProducts());
  }

  removeSliderAnimation() {
  }

  updateMenuClass(index: number) {
    this.productIndex = index;
    this.orderForm.get('class').setValue(this.products[index].class);
  }

  updateProducts() {
    const currentOffer: IOffer = _.head(
      _.filter(this.offers, (offer: IOffer) => offer.weekKey === this.orderForm.get('dateKey').value)
    );
    const products = _.filter(currentOffer.products, (product: IProduct) => {
      const personsAmountValid = product.personsAmount === this.orderForm.get('personAmount').value;
      const goodsCountValid = product.goodsCount === this.orderForm.get('goodsCount').value;
      const typeValid = product.type === ProductType.Box;
      return personsAmountValid && goodsCountValid && typeValid;
    });
    const sortedProducts = _.map(this.appService.menuTabsConfig.tabsSortRule, (tabClass: string) => {
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
      const personsAmountValid = product.personsAmount === this.orderForm.get('personAmount').value;
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
