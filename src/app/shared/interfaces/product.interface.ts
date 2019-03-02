import { PersonsAmount } from '../enums/persons-amount.enum';
import { ProductType } from '../enums/product-type.enum';
import { EProductClass } from '../enums/product-class.enum';
import {IGood} from './good.interface';

export interface IProductData {
  available: boolean;
  availableGoods: string[];
  availabilityDates: string[];
  class: EProductClass;
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
