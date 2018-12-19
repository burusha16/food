import * as _ from 'lodash/core';
import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TitleCasePipe} from '@angular/common';
import {IProduct} from '@shared/interfaces/product.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AppService} from '@shared/services/base-app.service';
import {IOrderFormConfig} from '@shared/interfaces/IOrderFormConfig.interface';
import {IOffer} from '@shared/interfaces/offers.interface';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ProductType} from '@shared/enums/productType.enum';
import {productClass} from '@shared/enums/productClass.enum';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnDestroy {
  additionalProducts: IProduct[];
  additionalMilkProducts: IProduct[];
  formConfig: IOrderFormConfig = this.appService.orderFormConfig;
  productUpdateFactors: string[] = ['daysAmount', 'dateKey', 'class', 'personAmount'];
  orderForm: FormGroup;
  product: IProduct;
  offers: IOffer[];
  onDestroy$: Subject<void> = new Subject();

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private appService: AppService) {
    this.offers = this.route.snapshot.data.offers;
    this.formConfig.defaultClass = new TitleCasePipe().transform(this.route.snapshot.params.class);
    this.orderForm = this.fb.group({
      daysAmount: this.formConfig.defaultDaysAmount,
      dateKey: this.appService.actualWeekKey,
      class: this.formConfig.defaultClass,
      personAmount: this.formConfig.defaultPersonsAmount,
      defaultSet: [],
      additionalSet: [],
      additionalMilkSet: []
    });
    _.each(this.productUpdateFactors, (key: string) => {
      this.orderForm.get(key).valueChanges
        .pipe(takeUntil(this.onDestroy$))
        .subscribe( () => this.updateProducts());
    });
    this.orderForm.get('dateKey').valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe( () => this.updateAdditionalProducts());
    this.updateProducts();
    this.updateAdditionalProducts();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  updateProducts() {
    const currentOffer: IOffer = _.head(
      _.filter(this.offers, (offer: IOffer) => offer.weekKey === this.orderForm.get('dateKey').value)
    );
    this.product = _.head(
      _.filter(currentOffer.products, (product: IProduct) => {
        const personsAmountValid = product.personsAmount === this.orderForm.get('personAmount').value;
        const classValid = product.class === this.orderForm.get('class').value;
        const daysAmountValid = product.goodsCount === this.orderForm.get('daysAmount').value;
        const typeValid = product.type === ProductType.Box;
        return personsAmountValid && classValid && daysAmountValid && typeValid;
      })
    );
  }

  updateAdditionalProducts() {
    const currentOffer: IOffer = _.head(
      _.filter(this.offers, (offer: IOffer) => offer.weekKey === this.orderForm.get('dateKey').value)
    );
    const additionalProducts = _.filter(currentOffer.products, (product: IProduct) => {
      const personsAmountValid = product.personsAmount === this.orderForm.get('personAmount').value;
      const typeValid = product.type === ProductType.Additional;
      return personsAmountValid && typeValid;
    });
    this.additionalProducts = _.filter(additionalProducts,
      (product: IProduct) => product.class !== productClass.Cheese && product.class !== productClass.Milk);
    this.additionalMilkProducts = _.filter(additionalProducts,
      (product: IProduct) => product.class === productClass.Cheese || product.class === productClass.Milk);
  }
}
