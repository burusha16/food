import {Component, OnInit} from '@angular/core';
import { Responsive } from '../../shared/decorators/responsive.decorator';
import { IResponsiveComponent } from '../../shared/interfaces/responsive-component.interface';

@Responsive()
@Component({
  selector: 'app-header-promo',
  templateUrl: './header-promo.component.html',
  styleUrls: ['./header-promo.component.scss']
})
export class HeaderPromoComponent implements OnInit, IResponsiveComponent {
  isMobile: boolean;
  isSmall: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  navigateToPromo() {
    console.log('navigate!');
  }
}
