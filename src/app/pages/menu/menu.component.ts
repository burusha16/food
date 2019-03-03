import * as _ from 'lodash/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {AppService} from '@shared/services/base-app.service';
import {IProduct} from '@shared/interfaces/product.interface';
import {ITabWithLink} from '@shared/interfaces/app-config.interface';
import {MenuService} from './menu.service';
import {MatSidenav} from '@angular/material';
import {MenuSidenavService} from './menu-sidenav.service';
import {IAdditionalProductSelect} from './shared/additional-product-select.interface';
import {isEqualByValue} from '@shared/other/helpers';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  additionalProducts: IProduct[];
  additionalMilkProducts: IProduct[];
  defaultProductIndex: number;
  onDestroy$: Subject<void> = new Subject();
  defaultProduct: IProduct;
  tabWithLink: ITabWithLink = this.appService.menuTabsConfig.linkInTab;
  orderFormValue: Object;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private appService: AppService,
              private menuService: MenuService,
              private menuSidenav: MenuSidenavService,
              private cdRef: ChangeDetectorRef) {
    const routeClassParam = this.route.snapshot.params.class;
    this.defaultProductIndex = this.menuService.getInitialIndex(routeClassParam);
    const defaultProductResetFactors: string[] = ['goodsCount', 'dateKey', 'personAmount'];
    const defaultProductUpdateFactors: string[] = ['class', 'defaultSet'];
    const additionalProductResetFactors: string[] = ['dateKey'];
    this.menuService.initOrderForm();
    this.menuService.setDefaultProducts();
    this.menuService.setAdditionalProducts();
    this.setDefaultProduct();
    this.setAdditionalProducts();
    this.orderForm.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((value: any) => {
        const lastValue = this.orderFormValue;
        this.orderFormValue = value;
        _.each(defaultProductResetFactors, (key: string) => {
          if (!isEqualByValue(lastValue[key], value[key])) {
            this.menuService.setDefaultProducts();
            this.setDefaultProduct();
          }
        });
        _.each(additionalProductResetFactors, (key: string) => {
          if (!isEqualByValue(lastValue[key], value[key])) {
            this.menuService.setAdditionalProducts();
            this.setAdditionalProducts();
          }
        });
        _.each(defaultProductUpdateFactors, (key: string) => {
          if (!isEqualByValue(lastValue[key], value[key])) {
            this.setDefaultProduct();
          }
        });
      });
  }

  ngAfterViewInit() {
    this.menuSidenav.sidenav = this.sidenav;
    this.orderFormValue = this.orderForm.value;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  get orderForm(): FormGroup {
    return this.menuService.orderForm;
  }

  get products(): IProduct[] {
    return this.menuService.defaultProducts;
  }

  hideSidenav() {
    this.menuSidenav.hideSidenav();
  }

  setAdditionalProducts() {
    this.additionalProducts = this.menuService.additionalProducts;
    this.additionalMilkProducts = this.menuService.additionalMilkProducts;
  }

  setDefaultProduct() {
    const product: IProduct = this.products[this.defaultProductIndex];
    product.defaultGoodsModels = product.availableGoodsModels
      .filter((value, index) => this.orderForm.get('defaultSet').value[index]);
    this.defaultProduct = product;
  }

  updateAdditionalProducts(value: IAdditionalProductSelect) {
    this.menuService.setAdditionalProducts(false, value);
    this.setAdditionalProducts();
  }

  updateMenuClass(index: number) {
    this.defaultProductIndex = this.menuService.productIndex = index;
    this.setDefaultProduct();
    const currentClass = this.defaultProduct.class;
    this.orderForm.get('class').setValue(currentClass);
    const currentClassUrl = currentClass.toLowerCase();
    this.router.navigateByUrl(`menu/${currentClassUrl}`);
    this.cdRef.markForCheck();
  }
}
