import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, TemplateRef, ViewChild} from '@angular/core';
import {IProduct} from '@shared/interfaces/product.interface';
import {MenuService} from '../menu.service';
import {IGood} from '@shared/interfaces/good.interface';
import {Subject} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {IMenuConstructorOutput} from '../menu-constructor/menu-constructor.component';
import {WindowScrollService} from '@shared/services/window-scroll.service';
import {NoopScrollStrategy} from '@angular/cdk/overlay';
import {MenuSidenavService} from '../menu-sidenav.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-menu-default-set',
  templateUrl: './menu-default-set.component.html',
  styleUrls: ['./menu-default-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuDefaultSetComponent {
  @Input() product: IProduct;
  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

  constructor(private menuService: MenuService,
              private menuSidenav: MenuSidenavService,
              private cdRef: ChangeDetectorRef,
              private dialog: MatDialog,
              private scrollService: WindowScrollService) {
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
    const goodCountControl = this.orderForm.get('goodsCount');
    if (data.goodsCount !== goodCountControl.value) {
      this.orderForm.get('goodsCount').setValue(data.goodsCount);
    }
    this.orderForm.get('defaultSet').setValue(data.goods);
  }

  get orderForm(): FormGroup {
    return this.menuService.orderForm;
  }

  showDetails(good: IGood) {
    this.menuService.productDetailsData$.next({
      goods: this.product.defaultGoodsModels,
      selectedGoodHash: good.id
    });
    this.menuSidenav.showSidenav();
  }
}
