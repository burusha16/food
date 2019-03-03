import * as _ from 'lodash/core';
import {IProduct, IProductData} from '../interfaces/product.interface';
import {IGood, IGoodData} from '../interfaces/good.interface';
import {EProductClass} from '../enums/product-class.enum';
import {PersonsAmount} from '../enums/persons-amount.enum';
import {ProductType} from '../enums/product-type.enum';
import {Good} from '@shared/models/good.model';
import * as moment from 'moment';

export class Product implements IProduct {
  available: boolean;
  availabilityDates: string[];
  availableGoods: string[];
  availableGoodsModels: IGood[];
  class: EProductClass;
  constructorAvailable: boolean;
  constructorTimeIsUp: boolean;
  defaultGoods: string[];
  defaultGoodsModels: IGood[];
  goodsCount: number;
  name: string;
  personsAmount: number;
  personsAmountView: PersonsAmount;
  price: number;
  productId: number;
  type: ProductType;

  constructor(product: IProductData, goods: IGood[], stopTime: string) {
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
    this.setConstructTimeIsUp(stopTime);
  }

  setConstructTimeIsUp(stopTime: string) {
    this.constructorTimeIsUp = moment().unix() > moment(stopTime).unix();
  }

  getGoodsByHash(goods: string[], allGoodsModels: IGood[]): IGood[] {
    return _.map(goods, ((hash: string) => {
      const filtrderGood: IGoodData = _.head(_.filter(allGoodsModels, (item: IGood) => item.id === hash));
      return new Good(filtrderGood);
    }));
  }

  updateDefaultGoods() {
    this.defaultGoodsModels = _.map(this.defaultGoods, (goodHash: string) => {
     return _.head(
       _.filter(this.availableGoodsModels, (good: IGood) => good.id === goodHash)
     );
    });
  }
}
