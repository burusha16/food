import {AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy} from '@angular/core';
import {MenuService} from '../menu.service';
import {IGood} from '@shared/interfaces/good.interface';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {IProductDetailsData} from '@shared/interfaces/products-details-data.interface';
import {IResponsiveComponent} from '@shared/interfaces/responsive-component.interface';
import {Responsive} from '@shared/decorators/responsive.decorator';

@Responsive()
@Component({
  selector: 'app-product-details-list',
  templateUrl: './product-details-list.component.html',
  styleUrls: ['./product-details-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsListComponent implements AfterViewChecked, OnDestroy, IResponsiveComponent {
  goods: IGood[] = [];
  isMobile: boolean;
  isSmall: boolean;
  selectedGoodHash: string;
  needToSetGoodPosition: boolean;
  onDestroy$: Subject<void> = new Subject();

  constructor(private menuService: MenuService,
              private elRef: ElementRef,
              private cdRef: ChangeDetectorRef) {
    this.menuService.productDetailsData$
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe((data: IProductDetailsData) => {
        this.goods = data.goods;
        this.selectedGoodHash = data.selectedGoodHash;
        this.needToSetGoodPosition = true;
        this.cdRef.markForCheck();
      });
  }

  ngAfterViewChecked() {
    if (this.needToSetGoodPosition) {
      this.setSelectedGoodPosition();
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  setSelectedGoodPosition() {
    const el: HTMLElement = this.elRef.nativeElement;
    const selectedGoodEl: HTMLElement = el.querySelector(`[hash="${this.selectedGoodHash}"]`);
    el.scrollTo(0, selectedGoodEl.offsetTop);
    this.needToSetGoodPosition = false;
  }
}
