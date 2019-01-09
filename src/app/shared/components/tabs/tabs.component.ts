import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
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
export class TabsComponent implements OnInit, IResponsiveComponent {
  @Input() products: IProduct[];
  @Output() animationDone: EventEmitter<void> = new EventEmitter<void>();
  @Output() selectedTabChange: EventEmitter<number> = new EventEmitter<number>();
  isMobile: boolean;
  isSmall: boolean;
  tabsMutationObserver: MutationObserver;

  constructor(private elRef: ElementRef) {
  }

  ngOnInit() {
    if (this.isMobile) {
      const element = this.elRef.nativeElement.querySelector('mat-ink-bar');
      this.tabsMutationObserver = new MutationObserver((mutations: MutationRecord[]) => {
          mutations.forEach(() => this.translateActiveTabLabelToCenter());
        }
      );
      this.tabsMutationObserver.observe(element, {
        attributes: true
      });
    }
  }

  onAnimationDone() {
    this.animationDone.emit();
  }

  onSelectedTabChange(index: number) {
    this.selectedTabChange.emit(index);
  }

  translateActiveTabLabelToCenter() {
    const inkElement: HTMLElement = this.elRef.nativeElement.querySelector('.mat-ink-bar');
    const target: HTMLElement = this.elRef.nativeElement.querySelector('.mat-tab-list');
    const windowHalfWindth = this.elRef.nativeElement.offsetWidth / 2;
    const inkIndent = 16;
    const inkPosition = parseInt(inkElement.style.left, 10) - inkIndent;
    const labelHafWidth = parseInt(inkElement.style.width, 10) / 2 + inkIndent;
    target.style.left = `${windowHalfWindth - inkPosition - labelHafWidth}px`;
  }
}
