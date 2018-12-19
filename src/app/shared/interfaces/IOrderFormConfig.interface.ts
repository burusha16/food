import {productClass} from '@shared/enums/productClass.enum';

export interface IOrderFormConfig {
  defaultClass: productClass | string;
  defaultDaysAmount: number;
  defaultPersonsAmount: number;
}
