import {Component} from '@angular/core';
import {IProduct} from '@shared/interfaces/product.interface';
import {MenuService} from '../menu.service';

@Component({
  selector: 'app-menu-default-set',
  templateUrl: './menu-default-set.component.html',
  styleUrls: ['./menu-default-set.component.scss']
})
export class MenuDefaultSetComponent {
  constructor(private menuService: MenuService) {
  }

  get product(): IProduct {
    return this.menuService.product;
  }

  showDetails() {
    this.menuService.showSidenav();
  }
}
