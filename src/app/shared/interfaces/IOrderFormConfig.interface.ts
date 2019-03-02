import {EProductClass} from '@shared/enums/product-class.enum';
import {PersonsAmount} from '@shared/enums/persons-amount.enum';

export interface IOrderFormConfig {
  aviablePersonsAmounts: PersonsAmount[];
  avaibleGoodsCounts: number[];
  defaultClass: EProductClass | string;
  defaultGoodsCount: number;
  defaultPersonsAmount: PersonsAmount;
  defaultPrice: number;
}
