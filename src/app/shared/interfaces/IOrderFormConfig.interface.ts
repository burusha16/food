import {productClass} from '@shared/enums/productClass.enum';
import {PersonsAmount} from '@shared/enums/personsAmount.enum';

export interface IOrderFormConfig {
  aviablePersonsAmounts: PersonsAmount[];
  avaibleGoodsCounts: number[];
  defaultClass: productClass | string;
  defaultGoodsCount: number;
  defaultPersonsAmount: PersonsAmount;
}
