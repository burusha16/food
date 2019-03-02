import {EProductClass} from '@shared/enums/product-class.enum';

export interface IAdditionalProductSelect {
  class: EProductClass;
  goodsCount: number;
  selectedGoods: string[];
}
