import * as _ from 'lodash/core';
import {IOffer} from '../interfaces/offers.interface';
import {IProduct} from '../interfaces/product.interface';
import {IGood} from '../interfaces/good.interface';
import {Product} from './product.model';

export class Offer implements IOffer {
  weekKey: string;
  weekStart: string;
  isActualWeek: boolean;
  deliveryDays: string[];
  constructorStopTime: string;
  products: IProduct[];
  goods: IGood[];

  constructor(data) {
    this.weekKey = data.weekKey;
    this.weekStart = data.weekStart;
    this.isActualWeek = data.isActualWeek;
    this.deliveryDays = data.deliveryDays;
    this.constructorStopTime = data.constructorStopTime;
    this.products = this.getProductsWithGoodsModels(data.products, data.goods, data.constructorStopTime);
  }

  getProductsWithGoodsModels(products: IProduct[], goods: IGood[], stopTime: string): IProduct[] {
    const fixedGoods = this.getGoodsWithFixedImagePath(goods);
    return _.map(products, (product: IProduct) => new Product(product, fixedGoods, stopTime));
  }

  getGoodsWithFixedImagePath(goods): IGood[] {
    return _.map(goods, (good: IGood) => {
      if (good.images.rectangular) {
        good.images.rectangular.s840x454 = good.images.rectangular['840x454'];
      }
      return good;
    });
  }
}
