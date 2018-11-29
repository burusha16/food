import { IProduct } from './product.interface';
import { IGood } from './good.interface';

export interface IOffer {
  weekKey: string;
  weekStart: string;
  isActualWeek: boolean;
  deliveryDays: string[];
  constructorStopTime: string;
  products: IProduct[];
  goods: IGood;
}
