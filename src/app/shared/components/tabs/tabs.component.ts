import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {IProduct} from '@shared/interfaces/product.interface';
import {Responsive} from '@shared/decorators/responsive.decorator';
import {IResponsiveComponent} from '@shared/interfaces/responsive-component.interface';

@Responsive()
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabsComponent implements OnInit, IResponsiveComponent{
  @Input() products: IProduct[];
  @Output() animationDone: EventEmitter<void> = new EventEmitter<void>();
  @Output() selectedTabChange: EventEmitter<number> = new EventEmitter<number>();
  isMobile: boolean;
  isSmall: boolean;

  ngOnInit() {
  }

  onAnimationDone() {
    this.animationDone.emit();
  }

  onSelectedTabChange(index: number) {
    this.selectedTabChange.emit(index);
  }
}
