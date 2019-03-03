import {Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, TemplateRef, Output, EventEmitter} from '@angular/core';
import {IProduct} from '@shared/interfaces/product.interface';
import {ControlContainer, FormGroupDirective} from '@angular/forms';
import {IMenuConstructorOutput} from '../../menu-constructor/menu-constructor.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {NoopScrollStrategy} from '@angular/cdk/overlay';
import {MenuService} from '../../menu.service';
import {MenuSidenavService} from '../../menu-sidenav.service';
import {WindowScrollService} from '@shared/services/window-scroll.service';
import {IAdditionalProductSelect} from '../../shared/additional-product-select.interface';
import {Product} from '@shared/models/product.model';

@Component({
  selector: 'app-additional-product',
  templateUrl: './additional-product.component.html',
  styleUrls: ['./additional-product.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdditionalProductComponent implements OnInit {
  @Input() product: Product;
  @Input() controlArrayName: string;
  @Input() controlIndex: number;
  @Output() additionalProductSelect: EventEmitter<IAdditionalProductSelect> = new EventEmitter();
  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

  constructor(private dialog: MatDialog,
              private menuService: MenuService,
              private menuSidenav: MenuSidenavService,
              private scrollService: WindowScrollService) {
  }

  ngOnInit() {
  }

  showDetails(product: Product) {
    this.menuService.productDetailsData$.next({
      goods: product.defaultGoodsModels,
      selectedGoodHash: product.defaultGoodsModels[0].id
    });
    this.menuSidenav.showSidenav();
  }

  hideContructor() {
    this.dialog.closeAll();
    this.scrollService.enableWindowScroll();
  }

  setGoods(data: IMenuConstructorOutput) {
    const goodsIdArray = data.goods
      .map((value: boolean, index: number) => value ? this.product.availableGoods[index] : '')
      .filter(value => value);
    this.additionalProductSelect.emit({
      class: this.product.class,
      goodsCount: data.goodsCount,
      selectedGoods: goodsIdArray
    });
  }

  showConstructor() {
    const dialogConfig: MatDialogConfig = {
      panelClass: 'mat-dialog-full-page',
      scrollStrategy: new NoopScrollStrategy()
    };
    this.dialog.open(this.dialogTemplate, dialogConfig);
    this.scrollService.disableWindowScroll();
  }
}
