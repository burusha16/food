import * as _ from 'lodash/core';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit, TemplateRef,
  ViewChild,
} from '@angular/core';
import {ControlContainer, FormGroup, FormGroupDirective} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {AppService} from '@shared/services/base-app.service';
import {MenuService} from '../menu.service';
import {Responsive} from '@shared/decorators/responsive.decorator';
import {PersonsAmount} from '@shared/enums/persons-amount.enum';
import {IProduct} from '@shared/interfaces/product.interface';
import {IOption} from '@shared/interfaces/option.interface';
import {IOrderFormConfig} from '@shared/interfaces/IOrderFormConfig.interface';
import {IResponsiveComponent} from '@shared/interfaces/responsive-component.interface';
import {PriceCurrencyPipe} from '@shared/pipes/price-currency.pipe';
import {WindowScrollService} from '@shared/services/window-scroll.service';
import {Subject} from 'rxjs';
import {DeviceWindowService} from '@shared/services/device-window.service';
import {takeUntil} from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {NoopScrollStrategy} from '@angular/cdk/overlay';
import {IMenuConstructorOutput} from '../menu-constructor/menu-constructor.component';

@Responsive()
@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuDetailsComponent implements OnInit, AfterViewInit, OnDestroy, IResponsiveComponent {
  @Input() defaultProduct: IProduct;
  @Input() additionalProducts: IProduct[];
  @Input() additionalMilkProducts: IProduct[];
  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;
  additionalMenuPassed$: Subject<boolean> = this.menuService.additionalMenuPassed$;
  detailsIsFixed$: Subject<boolean> = new Subject<boolean>();
  formConfig: IOrderFormConfig = this.appService.orderFormConfig;
  goodsCountsOptions: IOption[] = [];
  isMobile: boolean;
  isSmall: boolean;
  personsAmountOptions: IOption[] = [];
  onlinePaySale = this.appService.paymentConfig.onlinePaySaleInPersents;
  onDestroy$: Subject<void> = new Subject<void>();

  constructor(private appService: AppService,
              private menuService: MenuService,
              private translate: TranslateService,
              private elRef: ElementRef,
              private scrollService: WindowScrollService,
              private deviceService: DeviceWindowService,
              private cdRef: ChangeDetectorRef,
              private dialog: MatDialog) {
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
    this.orderForm.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => this.cdRef.detectChanges());
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.scrollService.pageUpdated$.pipe(
      takeUntil(this.onDestroy$)
    )
      .subscribe(() => {
        const scrollBreakpoint = this.elRef.nativeElement.offsetTop - this.headerHeight;
        this.scrollService.addScrollListener(scrollBreakpoint, 'MenuDetailsComponent', this.detailsIsFixed$);
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  get headerHeight(): number {
    const headerListenerName = 'HeaderComponent';
    return this.scrollService.listeners.has(headerListenerName)
      ? this.scrollService.listeners.get(headerListenerName).breakpoint
      : 0;
  }

  get priceTooltipTranslateProps(): any {
    return {sale: this.onlinePaySale, price: new PriceCurrencyPipe().transform(this.totalPrice, '0.0', true, 'rub')};
  }

  get orderForm(): FormGroup {
    return this.menuService.orderForm;
  }

  get totalPrice(): number {
    const productsSetNames: string[] = ['additionalSet', 'additionalMilkSet'];
    const productsPrices: number[] = [this.defaultProduct.price];
    productsSetNames.forEach((controlsName: string) => {
      const products: boolean[] = this.orderForm.get(controlsName).value;
      const productsPrice: number[] = products.map((value: boolean, index: number) => value ? this.additionalProducts[index].price : 0);
      productsPrices.push(...productsPrice);
    });
    return productsPrices.reduce((prev, next) => prev + next);
  }

  get totalPriceWithSale(): number {
    const fraction = (100 - this.onlinePaySale) / 100;
    return this.totalPrice * fraction;
  }

  showContructor() {
    const dialogConfig: MatDialogConfig = {
      panelClass: 'mat-dialog-full-page',
      scrollStrategy: new NoopScrollStrategy()
    };
    this.dialog.open(this.dialogTemplate, dialogConfig);
    this.scrollService.disableWindowScroll();
  }

  hideContructor() {
    this.dialog.closeAll();
    this.scrollService.enableWindowScroll();
  }

  selectGoods(data: IMenuConstructorOutput) {
    this.orderForm.get('goodsCount').setValue(data.goodsCount);
    this.orderForm.get('defaultSet').setValue(data.goods);
  }
}
