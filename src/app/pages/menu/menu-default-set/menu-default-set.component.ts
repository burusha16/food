import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {IProduct} from '@shared/interfaces/product.interface';
import {MenuService} from '../menu.service';
import {IGood} from '@shared/interfaces/good.interface';
import {NavigationEnd, Router} from '@angular/router';
import {filter, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-menu-default-set',
  templateUrl: './menu-default-set.component.html',
  styleUrls: ['./menu-default-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuDefaultSetComponent implements OnDestroy {
  onDestroy$: Subject<void> = new Subject();
  constructor(private menuService: MenuService,
              private router: Router,
              private cdRef: ChangeDetectorRef) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        tap(() => this.cdRef.markForCheck())
      )
      .subscribe();
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
    this.menuService.showSidenav();
  }
}
