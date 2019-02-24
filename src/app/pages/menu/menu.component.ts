import * as _ from 'lodash/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {AppService} from '@shared/services/base-app.service';
import {IProduct} from '@shared/interfaces/product.interface';
import {ITabWithLink} from '@shared/interfaces/app-config.interface';
import {MenuService} from './menu.service';
import {MatSidenav} from '@angular/material';
import {MenuSidenavService} from './menu-sidenav.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  additionalProducts: IProduct[];
  additionalMilkProducts: IProduct[];
  defaultProductIndex: number;
  onDestroy$: Subject<void> = new Subject();
  defaultProduct: IProduct;
  productUpdateFactors: string[] = ['goodsCount', 'dateKey', 'class', 'personAmount'];
  tabWithLink: ITabWithLink = this.appService.menuTabsConfig.linkInTab;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private appService: AppService,
              private menuService: MenuService,
              private menuSidenav: MenuSidenavService,
              private cdRef: ChangeDetectorRef) {
    const routeClassParam = this.route.snapshot.params.class;
    this.defaultProductIndex = this.menuService.getInitialIndex(routeClassParam);
    this.menuService.initOrderForm();
    this.menuService.updateProducts();
    this.menuService.updateAdditionalProducts();
    this.setDefaultProduct();
    this.setAdditionalProducts();
    _.each(this.productUpdateFactors, (key: string) => {
      this.orderForm.get(key).valueChanges
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(() => {
          this.menuService.updateProducts();
        });
    });
    this.orderForm.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.setDefaultProduct();
        this.cdRef.markForCheck();
      });
    this.orderForm.get('dateKey').valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.menuService.updateAdditionalProducts();
      });
  }

  ngAfterViewInit() {
    this.menuSidenav.sidenav = this.sidenav;
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
