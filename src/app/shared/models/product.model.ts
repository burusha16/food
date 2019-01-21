import * as _ from 'lodash/core';
import {IProduct, IProductData} from '../interfaces/product.interface';
import {IGood, IGoodData} from '../interfaces/good.interface';
import {productClass} from '../enums/productClass.enum';
import {PersonsAmount} from '../enums/personsAmount.enum';
import {ProductType} from '../enums/productType.enum';
import {GoodModel} from '@shared/models/good.model';

export class Product implements IProduct {
  available: boolean;
  availabilityDates: string[];
  availableGoods: string[];
  availableGoodsModels: IGood[];
  class: productClass;
  constructorAvailable: boolean;
  defaultGoods: string[];
  defaultGoodsModels: IGood[];
  goodsCount: number;
  name: string;
  personsAmount: number;
  personsAmountView: PersonsAmount;
  price: number;
  productId: number;
  type: ProductType;

  constructor(product: IProductData, goods: IGood[]) {
    this.available = product.available;
    this.availableGoods = product.availableGoods;
    this.availabilityDates = product.availabilityDates;
    this.class = product.class;
    this.constructorAvailable = product.constructorAvailable;
    this.defaultGoods = product.defaultGoods;
    this.goodsCount = product.goodsCount;
    this.name = product.name;
    this.personsAmount = product.personsAmount;
    this.personsAmountView = product.personsAmountView;
    this.price = product.price;
    this.productId = product.productId;
    this.type = product.type;
    this.availableGoodsModels = this.getGoodsByHash(product.availableGoods, goods);
    this.defaultGoodsModels = this.getGoodsByHash(product.defaultGoods, goods);
  }

  getGoodsByHash(goods: string[], allGoodsModels: IGood[]): IGood[] {
    return _.map(goods, ((hash: string) => {
      const filtrderGood: IGoodData = _.head(_.filter(allGoodsModels, (item: IGood) => item.id === hash));
      return new GoodModel(filtrderGood);
    }));
  }
}
