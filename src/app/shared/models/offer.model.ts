import _ from 'lodash/core';
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
  goods: IGood;

  constructor(data) {
    this.weekKey = data.weekKey;
    this.weekStart = data.weekStart;
    this.isActualWeek = data.isActualWeek;
    this.deliveryDays = data.deliveryDays;
    this.constructorStopTime = data.constructorStopTime;
    this.products = this.getProductsWithGoodsModels(data.products, data.goods);
    this.goods = data.goods;
  }

  getProductsWithGoodsModels(products: IProduct[], goods: IGood[]): IProduct[] {
    return _.map(products, (product: IProduct) => new Product(product, goods));
  }
}
