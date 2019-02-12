import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {IProduct} from '@shared/interfaces/product.interface';
import {MenuService} from '../menu.service';
import {WindowScrollService} from '@shared/services/window-scroll.service';
import {DeviceWindowService} from '@shared/services/device-window.service';
import {FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-menu-additional-set',
  templateUrl: './menu-additional-set.component.html',
  styleUrls: ['./menu-additional-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuAdditionalSetComponent implements OnInit, AfterViewInit, OnDestroy {
  onDestroy$: Subject<void> = new Subject();
  orderForm: FormGroup = this.menuService.orderForm;

  constructor(private menuService: MenuService,
              private scrollService: WindowScrollService,
              private deviceService: DeviceWindowService,
              private elRef: ElementRef) {
  }

  get additionalProducts(): IProduct[] {
    return this.menuService.additionalProducts;
  }

  get additionalMilkProducts(): IProduct[] {
    return this.menuService.additionalMilkProducts;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.scrollService.pageUpdated$.pipe(
      takeUntil(this.onDestroy$)
    )
      .subscribe(() => {
        const scrollBreakpoint = this.elRef.nativeElement.offsetTop;
        this.scrollService.addScrollListener(scrollBreakpoint, this.constructor.name, this.menuService.additionalMenuPassed$);
      });
  }

  ngOnDestroy() {
    this.scrollService.removeListener(this.constructor.name);
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
