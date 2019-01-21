import {IGood} from '@shared/interfaces/good.interface';

export interface IProductDetailsData {
  goods: IGood[];
  selectedGoodHash: string;
}
