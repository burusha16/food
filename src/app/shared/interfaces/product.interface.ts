import { PersonsAmount } from '../enums/presonsAmount.enum';
import { ProductType } from '../enums/productType.enum';
import { productClass } from '../enums/productClass.enum';
import {IGood} from './good.interface';

export interface IProduct {
  available: boolean;
  availableGoods?: string[];
  availableGoodsModels?: IGood[];
  availabilityDates: string[];
  class: productClass;
  constructorAvailable: boolean;
  defaultGoods?: string[];
  defaultGoodsModels?: IGood[];
  goodsCount: number;
  name: string;
  personsAmount: number;
  personsAmountView: PersonsAmount;
  productId: number;
  price: number;
  type: ProductType;
}
