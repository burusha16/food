import {Component} from '@angular/core';
import {IProduct} from '@shared/interfaces/product.interface';
import {MenuService} from '../menu.service';

@Component({
  selector: 'app-menu-default-set',
  templateUrl: './menu-default-set.component.html',
})
export class MenuDefaultSetComponent {
  constructor(private menuService: MenuService) {
  }

  get product(): IProduct {
    return this.menuService.product;
  }
}
