import * as _ from 'lodash/core';
import {Subject} from 'rxjs';
import {filter, takeUntil, map} from 'rxjs/operators';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {TitleCasePipe} from '@angular/common';
import {FormGroup} from '@angular/forms';
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
              private router: Router,
              private appService: AppService,
              private menuService: MenuService,
              private cdRef: ChangeDetectorRef) {
    this.menuService.offers = this.route.snapshot.data.offers;
    this.menuService.initOrderForm();
    this.menuService.updateAdditionalProducts();
    this.menuService.updateProducts();
    this.router.events
      .pipe(
        takeUntil(this.onDestroy$),
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        map(event => {
          this.menuService.formConfig.defaultClass = new TitleCasePipe().transform(this.route.snapshot.params.class);
          this.menuService.setInitialIndex();
          this.cdRef.markForCheck();
          return event;
        })
      )
      .subscribe();
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

  get productIndex(): number {
    return this.menuService.productIndex;
  }

  removeSliderAnimation() {
  }

  updateMenuClass(index: number) {
    this.menuService.productIndex = index;
    const currentClass = this.menuService.product.class;
    const currentClassUrl = currentClass.toLowerCase();
    this.orderForm.get('class').setValue(currentClass);
    this.router.navigateByUrl(`menu/${currentClassUrl}`);
  }
}
