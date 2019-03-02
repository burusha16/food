import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {IGood} from '../../../../shared/interfaces/good.interface';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-product-details-slider',
  templateUrl: './product-details-slider.component.html',
  styleUrls: ['./product-details-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsSliderComponent implements OnInit {
  @Input() goods: IGood[];
  @Input() activeId: string;
  @Input() dialogRef: MatDialogRef<any>;
  activeGoodIndex: number;

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.goods.forEach((good: IGood, index: number) =>
      this.activeGoodIndex = good.id === this.activeId ? index : this.activeGoodIndex);
  }

  get activeGood(): IGood {
    return this.goods[this.activeGoodIndex];
  }

  prevSlide() {
    if (this.activeGoodIndex) {
      this.activeGoodIndex--;
    } else {
      this.activeGoodIndex = this.goods.length - 1;
    }
    this.cdRef.markForCheck();
  }

  nextSlide() {
    if (this.activeGoodIndex === this.goods.length - 1) {
      this.activeGoodIndex = 0;
    } else {
      this.activeGoodIndex++;
    }
    this.cdRef.markForCheck();
  }

  close() {
    this.dialogRef.close();
  }
}
