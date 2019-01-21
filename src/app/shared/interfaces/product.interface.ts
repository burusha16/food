import { PersonsAmount } from '../enums/personsAmount.enum';
import { ProductType } from '../enums/productType.enum';
import { productClass } from '../enums/productClass.enum';
import {IGood, IGoodData} from './good.interface';

export interface IProductData {
  available: boolean;
  availableGoods: string[];
  availabilityDates: string[];
  class: productClass;
  constructorAvailable: boolean;
  defaultGoods: string[];
  goodsCount: number;
  name: string;
  personsAmount: number;
  personsAmountView: PersonsAmount;
  productId: number;
  price: number;
  type: ProductType;
}

export interface IProduct extends IProductData {
  availableGoodsModels?: IGood[];
  defaultGoodsModels?: IGood[];
}
