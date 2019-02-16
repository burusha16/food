import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, TemplateRef, ViewChild} from '@angular/core';
import {IProduct} from '@shared/interfaces/product.interface';
import {MenuService} from '../menu.service';
import {IGood} from '@shared/interfaces/good.interface';
import {takeUntil, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {IMenuConstructorOutput} from '../menu-constructor/menu-constructor.component';
import {WindowScrollService} from '@shared/services/window-scroll.service';
import {NoopScrollStrategy} from '@angular/cdk/overlay';
import {MenuSidenavService} from '../menu-sidenav.service';

@Component({
  selector: 'app-menu-default-set',
  templateUrl: './menu-default-set.component.html',
  styleUrls: ['./menu-default-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuDefaultSetComponent implements OnDestroy {
  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;
  onDestroy$: Subject<void> = new Subject();

  constructor(private menuService: MenuService,
              private menuSidenav: MenuSidenavService,
              private cdRef: ChangeDetectorRef,
              private dialog: MatDialog,
              private scrollService: WindowScrollService) {
    this.menuService.orderForm.valueChanges
      .pipe(
        takeUntil(this.onDestroy$),
        tap(() => this.cdRef.markForCheck())
      )
      .subscribe();
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
    this.product.defaultGoodsModels = data.goods;
    this.product.goodsCount = data.goodsCount;
    this.cdRef.markForCheck();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  get product(): IProduct {
    return this.menuService.product;
  }

  showDetails(good: IGood) {
    this.menuService.productDetailsData$.next({
      goods: this.product.defaultGoodsModels,
      selectedGoodHash: good.id
    });
    this.menuSidenav.showSidenav();
  }
}
