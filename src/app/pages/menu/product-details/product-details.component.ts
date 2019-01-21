import {AfterViewChecked, Component, ElementRef, OnDestroy} from '@angular/core';
import {MenuService} from '../menu.service';
import {IGood} from '@shared/interfaces/good.interface';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {IProductDetailsData} from '@shared/interfaces/products-details-data.interface';
import {IResponsiveComponent} from '@shared/interfaces/responsive-component.interface';
import {Responsive} from '@shared/decorators/responsive.decorator';

@Responsive()
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements AfterViewChecked, OnDestroy, IResponsiveComponent {
  goods: IGood[] = [];
  isMobile: boolean;
  isSmall: boolean;
  selectedGoodHash: string;
  needToSetGoodPosition: boolean;
  onDestroy$: Subject<void> = new Subject();

  constructor(private menuService: MenuService,
              private elRef: ElementRef) {
    this.menuService.productDetailsData$
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe((data: IProductDetailsData) => {
        this.goods = data.goods;
        this.selectedGoodHash = data.selectedGoodHash;
        this.needToSetGoodPosition = true;
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
