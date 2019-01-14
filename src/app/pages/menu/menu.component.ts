import * as _ from 'lodash/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TitleCasePipe} from '@angular/common';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AppService} from '@shared/services/base-app.service';
import {IProduct} from '@shared/interfaces/product.interface';
import {ITabWithLink} from '@shared/interfaces/app-config.interface';
import {MenuService} from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnDestroy {
  productUpdateFactors: string[] = ['goodsCount', 'dateKey', 'class', 'personAmount'];
  onDestroy$: Subject<void> = new Subject();
  tabWithLink: ITabWithLink = this.appService.menuTabsConfig.linkInTab;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private cdRef: ChangeDetectorRef,
              private appService: AppService,
              private menuService: MenuService) {
    this.menuService.offers = this.route.snapshot.data.offers;
    this.menuService.formConfig.defaultClass = new TitleCasePipe().transform(this.route.snapshot.params.class);
    this.menuService.initOrderForm();
    this.menuService.updateAdditionalProducts();
    this.menuService.updateProducts();
    _.each(this.productUpdateFactors, (key: string) => {
      this.orderForm.get(key).valueChanges
        .pipe(takeUntil(this.onDestroy$))
        .subscribe( () => this.menuService.updateProducts());
    });
    this.orderForm.get('dateKey').valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe( () => this.menuService.updateAdditionalProducts());
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  get orderForm(): FormGroup {
    return this.menuService.orderForm;
  }

  get products(): IProduct[] {
    return this.menuService.products;
  }

  removeSliderAnimation() {
  }

  updateMenuClass(index: number) {
    this.menuService.productIndex = index;
    this.orderForm.get('class').setValue(this.menuService.product.class);
  }
}
