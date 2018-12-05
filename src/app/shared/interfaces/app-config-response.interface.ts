import {ISmiItem} from './smi-list-item.iterface';

export interface IAppConfig {
  sliderMenuExamplesConfig: ISliderMenuExamplesConfig;
  smiList: ISmiItem[];
}

export interface ISliderMenuExamplesConfig {
  personsAmount: number;
  defaultGoodsLength: number;
  tabsSortRule: string[];
}
