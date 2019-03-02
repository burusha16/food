import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnDestroy,
  OnInit, Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {IProduct} from '@shared/interfaces/product.interface';
import {MenuService} from '../menu.service';
import {WindowScrollService} from '@shared/services/window-scroll.service';
import {DeviceWindowService} from '@shared/services/device-window.service';
import {ControlContainer, FormGroup, FormGroupDirective} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {IGood} from '@shared/interfaces/good.interface';
import {MenuSidenavService} from '../menu-sidenav.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {NoopScrollStrategy} from '@angular/cdk/overlay';
import {IMenuConstructorOutput} from '../menu-constructor/menu-constructor.component';
import {IAdditionalProductSelect} from '../shared/additional-product-select.interface';

@Component({
  selector: 'app-menu-additional-set',
  templateUrl: './menu-additional-set.component.html',
  styleUrls: ['./menu-additional-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuAdditionalSetComponent implements AfterViewInit, OnDestroy {
  @Input() additionalProducts: IProduct;
  @Input() additionalMilkProducts: IProduct;
  @Output() additionalProductSelect: EventEmitter<IAdditionalProductSelect> = new EventEmitter();
  onDestroy$: Subject<void> = new Subject();

  constructor(private menuService: MenuService,
              private scrollService: WindowScrollService,
              private elRef: ElementRef) {
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

  onAdditionalProductSelect(value: IAdditionalProductSelect) {
    this.additionalProductSelect.emit(value);
  }
}
